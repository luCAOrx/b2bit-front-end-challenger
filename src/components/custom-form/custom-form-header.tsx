interface CustomFormHeaderProperties {
  title: string
  description: string
}

export function CustomFormHeader({
  title,
  description,
}: CustomFormHeaderProperties) {
  return (
    <header className="w-48px mt-12 mb-6 flex h-16 flex-col gap-1">
      <h1 className="align-middle text-3xl leading-9 font-bold tracking-[-0.75px]">
        {title}
      </h1>
      <h3 className="align-middle text-base leading-6 font-normal tracking-normal text-text-secondary">
        {description}
      </h3>
    </header>
  )
}
