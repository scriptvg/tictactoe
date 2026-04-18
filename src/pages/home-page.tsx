import { cn } from "@/lib/utils"

function Page({ className, ...props }: React.ComponentProps<"div"> & {
  className?: string
}) {
  return <div className={cn(className)} {...props} />
}




export function HomePage() {
  return (
    <Page>
      



    </Page>
  )
}