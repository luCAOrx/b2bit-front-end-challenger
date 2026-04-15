import { EyeIcon, EyeOffIcon, Mail } from "lucide-react"
import { InputGroupButton } from "../ui/input-group"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"
import { LoginUserFormSchema } from "@/form-schemas/login-user-form-schema"
import { CustomInputGroup } from "../custom-input"
import { CustomForm } from "../custom-form"
import { Field } from "../ui/field"
import SubmitLoadingButton from "../submit-loading-button"

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
    <CustomForm.Root>
      <CustomForm.Header
        title="Olá, de novo!"
        description="Por favor, insira os seus dados para fazer login."
      />

      <CustomForm.Form form={form} handleSubmit={handleLoginUserSubmit}>
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
              <CustomInputGroup.Container form={form} formFieldName="email">
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
