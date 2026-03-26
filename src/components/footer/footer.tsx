export function Footer() {
  return (
    <footer
      className="flex w-full items-center justify-between border-solid bg-white opacity-100 in-dark:bg-foreground"
      aria-label="Rodapé"
    >
      <div className="my-5 ml-10 h-5.5 w-32">
        <span className="align-middle text-[18px] leading-[120%] font-bold tracking-[-0.27px] text-primary-button in-dark:text-white">
          Mini Twitter
        </span>
      </div>
    </footer>
  )
}
