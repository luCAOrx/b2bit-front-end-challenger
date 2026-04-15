import { CustomInputGroupAddon } from "./custom-input-group-addon"
import { CustomInputGroupInput } from "./custom-input-group-input"
import { CustomInputGroupInputContainer } from "./custom-input-group-input-container"
import { CustomInputGroupInputFieldError } from "./custom-input-group-input-field-error"
import { CustomInputGroupInputLabel } from "./custom-input-group-input-label"
import { CustomInputGroupInputRoot } from "./custom-input-group-root"
import { CustomInputGroupTextArea } from "./custom-input-group-text-area"

export const CustomInputGroup = {
  Root: CustomInputGroupInputRoot,
  Label: CustomInputGroupInputLabel,
  Input: CustomInputGroupInput,
  TextArea: CustomInputGroupTextArea,
  Container: CustomInputGroupInputContainer,
  Error: CustomInputGroupInputFieldError,
  Addon: CustomInputGroupAddon,
}
