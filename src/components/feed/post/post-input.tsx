import { CustomForm } from "@/components/custom-form"
import { CustomInputGroup } from "@/components/custom-input"
import { ImageUploadButton } from "@/components/image-upload-button/image-upload-button"
import SubmitLoadingButton from "@/components/submit-loading-button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
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
import { Controller, useForm } from "react-hook-form"
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
    <CustomForm.Root variant="postInput">
      <CustomForm.Form
        variant="postInput"
        form={form}
        handleSubmit={handleCreatePostSubmit}
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInputGroup.Root fieldState={fieldState} variant="post">
              <CustomInputGroup.Input
                field={field}
                formFieldName="title"
                inputGroupVariant="postInputGroup"
                inputGroupInputVariant="postInputGroupInputVariant"
                placeholder="Digite um titúlo para seu post"
                type="text"
                inputMode="text"
              />
              <CustomInputGroup.Error fieldState={fieldState} />
            </CustomInputGroup.Root>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInputGroup.Root fieldState={fieldState} variant="post">
              <CustomInputGroup.TextArea
                field={field}
                formFieldName="content"
                placeholder="E aí, o que está rolando?"
                inputMode="text"
              />
              <CustomInputGroup.Error fieldState={fieldState} />
            </CustomInputGroup.Root>
          )}
        />

        <div className="flex border-solid py-3">
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
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
            )}
          />
          <SubmitLoadingButton
            size="sm"
            isSubmitting={form.formState.isSubmitting}
          >
            Postar
          </SubmitLoadingButton>
        </div>
      </CustomForm.Form>
    </CustomForm.Root>
  )
}
