import { ImageUploadButton } from "@/components/image-upload-button/image-upload-button"
import SubmitLoadingButton from "@/components/submit-loading-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { UpdatePostFormSchema } from "@/form-schemas/update-post-form-schema"
import { convertFileToBase64 } from "@/helpers/convert-file-to-base64"
import { useAuth } from "@/hooks/use-auth"
import { Route } from "@/routes/index.route"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  updatePost,
  type UpdatePostResponseError,
} from "@services/mini-twitter-api/update-post"

import { useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface UpdatePostButtonProperties {
  postId: number
  image: string
  title: string
  content: string
}

export function UpdatePostButton({
  postId,
  image,
  title,
  content,
}: UpdatePostButtonProperties) {
  const { signOut } = useAuth()
  const queryClient = useQueryClient()
  const { auth } = Route.useRouteContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdatePostFormSchema>>({
    resolver: zodResolver(UpdatePostFormSchema),
    defaultValues: {
      title,
      content,
      image,
    },
  })

  async function handleUpdatePostSubmit(
    data: z.infer<typeof UpdatePostFormSchema>
  ) {
    if (!auth.isAuthenticated) return

    if (!form.formState.isDirty) return

    let imageBase64 = ""

    if (data.image && data.image instanceof File) {
      imageBase64 = await convertFileToBase64(data.image)
    } else if (typeof data.image === "string") {
      imageBase64 = data.image
    }

    await updatePost(
      { id: postId },
      {
        title: data.title,
        content: data.content,
        image: imageBase64,
      }
    )
      .then(() => {
        form.reset({
          title: form.getValues("title"),
          content: form.getValues("content"),
          image: imageBase64,
        })

        toast.success("Post atualizado com sucesso!", {
          position: "bottom-right",
          classNames: {
            success:
              "!bg-emerald-700 !text-white !rounded-[8px] !w-72 !h-16 !border-emerald-800 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })

        setIsDialogOpen(false)

        queryClient.invalidateQueries({
          queryKey: ["get-posts"],
        })
      })
      .catch((error: AxiosError<UpdatePostResponseError>) => {
        form.setError("image", {
          message:
            error.response?.data.error === "Não autorizado: Token não fornecido"
              ? "Realize o login ou registre-se para poder criar um post"
              : "Post não encontrado",
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button
          size="sm"
          className="flex h-9 min-h-9 w-auto min-w-auto cursor-pointer justify-between rounded-full bg-primary-button px-5 py-2 text-center align-middle text-sm leading-5 font-bold tracking-normal text-white hover:bg-primary-button/80 hover:text-[#E2E2EC]/80"
        >
          Atualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-151.5! rounded-[12px] border border-solid bg-input-background px-4 not-dark:shadow-md [&_svg]:size-6!">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleUpdatePostSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="mt-3 border-b not-dark:shadow-md">
                    <InputGroup className="mt-5 mb-3 h-18 min-h-15 w-151.5 border-transparent! ring-0!">
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
                  <Field className="not-dark:shadow-md in-dark:border-b in-dark:border-solid">
                    <FieldGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-content"
                        placeholder="E aí, o que está rolando?"
                        className="bg-input-foreground mt-5 mb-3 h-18 min-h-15 w-151.5 resize-none border-none pt-2 pr-3 pb-9 align-middle text-[18px]! leading-7 text-white not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[18px] placeholder:leading-7 placeholder:font-normal focus-visible:ring-0! focus-visible:ring-offset-0!"
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
                  <Field orientation="vertical">
                    <FieldGroup
                      {...field}
                      className="flex justify-center not-dark:shadow-md in-dark:border-b"
                    >
                      <ImageUploadButton
                        onChange={field.onChange}
                        value={field.value}
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
            </FieldGroup>
            <DialogFooter className="flex justify-between border-none!">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex h-9 min-h-9 w-auto min-w-auto cursor-pointer justify-between rounded-full bg-like px-5 py-2 text-center align-middle text-sm leading-5 font-bold tracking-normal text-white hover:bg-like/80 hover:text-[#E2E2EC]/80"
                >
                  Cancelar
                </Button>
              </DialogClose>
              {form.formState.isDirty && (
                <SubmitLoadingButton
                  size="sm"
                  isSubmitting={form.formState.isSubmitting}
                  className="flex w-auto"
                >
                  Confirmar alterações
                </SubmitLoadingButton>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
