import { ImageUploadButton } from "@/components/image-upload-button/image-upload-button"
import SubmitLoadingButton from "@/components/submit-loading-button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { CreatePostFormSchema } from "@/form-schemas/create-post-form-schema"
import { convertFileToBase64 } from "@/helpers/convert-file-to-base64"
import { useAuth } from "@/hooks/use-auth"
import { Route } from "@/routes/index.route"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createPost,
  type CreatePostResponseError,
} from "@services/mini-twitter-api/create-post"

import { useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

export function PostInput() {
  const { signOut } = useAuth()
  const queryClient = useQueryClient()
  const { auth } = Route.useRouteContext()

  const form = useForm<z.infer<typeof CreatePostFormSchema>>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  })

  async function handleCreatePostSubmit(
    data: z.infer<typeof CreatePostFormSchema>
  ) {
    if (!auth.isAuthenticated) return

    let imageBase64 = ""

    if (data.image && data.image instanceof File) {
      imageBase64 = await convertFileToBase64(data.image)
    } else if (typeof data.image === "string") {
      imageBase64 = data.image
    }

    await createPost({
      title: data.title,
      content: data.content,
      image: imageBase64,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["get-posts"],
        })

        form.reset()
      })
      .catch((error: AxiosError<CreatePostResponseError>) => {
        form.setError("image", {
          message:
            error.response?.data.error === "Não autorizado: Token não fornecido"
              ? "Realize o login ou registre-se para poder criar um post"
              : "",
        })

        if (
          error.response?.data.error ===
            "Não autorizado: Token inválido ou expirado" &&
          !auth.isAuthenticated
        ) {
          signOut()
        }
      })
  }

  return (
    <div className="h-auto w-160 rounded-[12px] border border-solid bg-input-background px-4 not-dark:shadow-md">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreatePostSubmit)}
          method="POST"
          className="flex h-full w-151.5 flex-col gap-3"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="border-b not-dark:shadow-md">
                  <InputGroup className="mt-5 mb-3 h-18 min-h-15 w-151.5 border-none border-transparent! ring-0!">
                    <InputGroupInput
                      {...field}
                      id="form-title"
                      placeholder="Digite um titúlo para seu post"
                      className="bg-input-foreground border-none align-middle text-[18px]! leading-7 text-white not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[18px] placeholder:leading-7 placeholder:font-normal"
                      inputMode="text"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-[14px] text-red-500"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="not-dark:shadow-md">
                  <FieldGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-content"
                      placeholder="E aí, o que está rolando?"
                      className="bg-input-foreground mt-5 mb-3 h-18 min-h-15 w-151.5 resize-none border-none pt-2 pr-3 pb-9 align-middle text-[18px]! leading-7 text-white ring-0! not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[18px] placeholder:leading-7 placeholder:font-normal"
                      inputMode="text"
                    />
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-[14px] text-red-500"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex w-151.5 flex-col border-t border-solid py-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <Field orientation="vertical">
                        <FieldGroup {...field}>
                          <ImageUploadButton
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </FieldGroup>

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="mb-4 text-[14px] text-red-500"
                          />
                        )}
                      </Field>
                    </div>
                    <SubmitLoadingButton
                      size="sm"
                      isSubmitting={form.formState.isSubmitting}
                    >
                      Postar
                    </SubmitLoadingButton>
                  </div>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  )
}
