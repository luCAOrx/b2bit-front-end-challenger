import { useState } from "react"
import { UserRound, Mail, EyeOffIcon, EyeIcon } from "lucide-react"
import { InputGroupButton } from "../ui/input-group"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import type { AxiosError } from "axios"
import { router } from "@/router"
import { RegisterUserFormSchema } from "@/form-schemas/register-user-form-schema"
import {
  registerUser,
  type RegisterUserResponseError,
} from "@services/mini-twitter-api/register-user"
import { CustomInputGroup } from "../custom-input"
import { CustomForm } from "../custom-form"
import { Field } from "../ui/field"
import SubmitLoadingButton from "../submit-loading-button"

export function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof RegisterUserFormSchema>>({
    resolver: zodResolver(RegisterUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  async function handleRegisterUserSubmit(
    data: z.infer<typeof RegisterUserFormSchema>
  ) {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        form.reset()

        toast.success("Cadastro realizado com sucesso!", {
          position: "bottom-right",
          classNames: {
            success:
              "!bg-emerald-700 !text-white !rounded-[8px] !w-72 !h-16 !border-emerald-800 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })

        router.navigate({ to: "/autenticacao", params: "guia=login" })
      })
      .catch((error: AxiosError<RegisterUserResponseError>) => {
        form.setError("email", {
          message:
            error.response?.data.error ===
            "Usuário já cadastrado ou dados inválidos"
              ? "Um usuário já está cadastrado com esse e-mail"
              : error.response?.data.error,
        })
      })
  }

  return (
    <CustomForm.Root>
      <CustomForm.Header
        title="Olá, vamos começar!"
        description="Por favor, insira os dados solicitados para fazer cadastro."
      />
      <CustomForm.Form handleSubmit={handleRegisterUserSubmit} form={form}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInputGroup.Root fieldState={fieldState}>
              <CustomInputGroup.Label
                form={form}
                formFieldName="name"
                fieldLabelTitle="Nome"
              />
              <CustomInputGroup.Container form={form} formFieldName="name">
                <CustomInputGroup.Input
                  field={field}
                  formFieldName="name"
                  type="text"
                  inputMode="text"
                  placeholder="Insira o seu nome"
                >
                  <CustomInputGroup.Addon>
                    <UserRound className="h-6 min-h-6 w-6 min-w-6 text-input-placeholder not-dark:text-text-secondary" />
                  </CustomInputGroup.Addon>
                </CustomInputGroup.Input>
              </CustomInputGroup.Container>
              <CustomInputGroup.Error fieldState={fieldState} />
            </CustomInputGroup.Root>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInputGroup.Root fieldState={fieldState}>
              <CustomInputGroup.Label
                form={form}
                formFieldName="email"
                fieldLabelTitle="E-mail"
              />
              <CustomInputGroup.Container form={form} formFieldName="email">
                <CustomInputGroup.Input
                  field={field}
                  formFieldName="email"
                  type="email"
                  inputMode="email"
                  placeholder="Insira o seu e-mail"
                >
                  <CustomInputGroup.Addon>
                    <Mail className="h-6 min-h-6 w-6 min-w-6 text-input-placeholder not-dark:text-text-secondary" />
                  </CustomInputGroup.Addon>
                </CustomInputGroup.Input>
              </CustomInputGroup.Container>
              <CustomInputGroup.Error fieldState={fieldState} />
            </CustomInputGroup.Root>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInputGroup.Root fieldState={fieldState}>
              <CustomInputGroup.Label
                form={form}
                formFieldName="password"
                fieldLabelTitle="Senha"
              />
              <CustomInputGroup.Container form={form} formFieldName="password">
                <CustomInputGroup.Input
                  formFieldName="password"
                  field={field}
                  type={showPassword ? "text" : "password"}
                  inputMode="text"
                  placeholder="Insira a sua senha"
                >
                  <CustomInputGroup.Addon>
                    <InputGroupButton
                      onClick={togglePasswordVisibility}
                      className="group h-6 min-h-6 w-6 min-w-6 cursor-pointer rounded-[8px] border-none bg-transparent! shadow-none hover:bg-transparent!"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="group-hover:fill-text-text-secondary-foreground/30! group-hover:text-text-text-secondary-foreground/30! h-6 min-h-6 w-6 min-w-6 text-input-placeholder transition-colors not-dark:text-text-secondary not-dark:placeholder-input-placeholder group-hover:text-text-secondary-foreground/30!" />
                      ) : (
                        <EyeIcon className="group-hover:fill-text-text-secondary-foreground/30! group-hover:text-text-text-secondary-foreground/30! h-6 min-h-6 w-6 min-w-6 text-input-placeholder transition-colors not-dark:text-text-secondary not-dark:placeholder-input-placeholder group-hover:text-text-secondary-foreground/30!" />
                      )}
                    </InputGroupButton>
                  </CustomInputGroup.Addon>
                </CustomInputGroup.Input>
              </CustomInputGroup.Container>
              <CustomInputGroup.Error fieldState={fieldState} />
            </CustomInputGroup.Root>
          )}
        />

        <Field orientation="horizontal">
          <SubmitLoadingButton
            size="xs"
            isSubmitting={form.formState.isSubmitting}
          >
            Continuar
          </SubmitLoadingButton>
        </Field>
      </CustomForm.Form>
      <CustomForm.Footer />
    </CustomForm.Root>
  )
}
