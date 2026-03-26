import { EyeIcon, EyeOffIcon, Mail } from "lucide-react"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SubmitLoadingButton from "../submit-loading-button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { LoginUserFormSchema } from "@/form-schemas/login-user-form-schema"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { signIn } = useAuth()

  const form = useForm<z.infer<typeof LoginUserFormSchema>>({
    resolver: zodResolver(LoginUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  async function handleLoginUserSubmit(
    data: z.infer<typeof LoginUserFormSchema>
  ) {
    await signIn(
      {
        email: data.email,
        password: data.password,
      },
      form
    )
  }

  return (
    <>
      <div className="w-48px mt-12 mb-6 flex h-16 flex-col gap-1">
        <h1 className="align-middle text-3xl leading-9 font-bold tracking-[-0.75px]">
          Olá, de novo!
        </h1>
        <h3 className="align-middle text-base leading-6 font-normal tracking-normal text-text-secondary">
          Por favor, insira os seus dados para fazer login.
        </h3>
      </div>
      <form onSubmit={form.handleSubmit(handleLoginUserSubmit)} method="POST">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="form-email"
                  className={cn(
                    form.getFieldState("email").error
                      ? "text-red-500"
                      : "align-middle text-sm leading-5 font-normal tracking-normal not-dark:text-text-secondary-foreground"
                  )}
                >
                  E-mail
                </FieldLabel>

                <div
                  className={cn(
                    form.getFieldState("email").error
                      ? "flex rounded-[8px] border border-red-500 bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
                      : "flex rounded-[8px] border bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
                  )}
                >
                  <InputGroup className="h-14.25 w-120 border-transparent! ring-0!">
                    <InputGroupInput
                      {...field}
                      id="form-email"
                      placeholder="Insira o seu e-mail"
                      className="h-14.25 w-full border-none! bg-transparent! text-[16px]!"
                      type="email"
                      autoComplete="one-time-code"
                    />
                  </InputGroup>
                  <InputGroupAddon
                    align="inline-end"
                    className="flex h-14.25 w-14 items-center justify-center"
                  >
                    <div className="group h-6 min-h-6 w-6 min-w-6 rounded-[8px]">
                      <Mail className="h-6 min-h-6 w-6 min-w-6 text-input-placeholder not-dark:text-text-secondary" />
                    </div>
                  </InputGroupAddon>
                </div>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="form-password"
                  className={cn(
                    form.getFieldState("password").error
                      ? "text-red-500"
                      : "align-middle text-sm leading-5 font-normal tracking-normal not-dark:text-text-secondary-foreground"
                  )}
                >
                  Senha
                </FieldLabel>
                <div
                  className={cn(
                    form.getFieldState("password").error
                      ? "flex rounded-[8px] border border-red-500 bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
                      : "flex rounded-[8px] border bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
                  )}
                >
                  <InputGroup className="h-14.25 w-120 border-transparent! ring-0!">
                    <InputGroupInput
                      {...field}
                      id="form-password"
                      placeholder="Insira a sua senha"
                      className="h-14.25 w-full border-none! bg-transparent! text-[16px]!"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <InputGroupAddon
                    align="inline-end"
                    className="flex h-14.25 w-14 items-center justify-center"
                  >
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
                  </InputGroupAddon>
                </div>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
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
        </FieldGroup>
      </form>
      <footer className="mb-12 w-120 px-20 pt-8">
        <p className="break-after-all text-center align-middle text-xs leading-4 font-normal tracking-normal text-[#94A3B8] not-dark:text-[#02274F]">
          Ao clicar em continuar, você concorda com nossos Termos de Serviço e
          Política de Privacidade.
        </p>
      </footer>
    </>
  )
}
