import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { X, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

const cellVariants = cva(
  "flex cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground shadow-sm transition-colors duration-100 hover:bg-muted/10 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-muted/50 dark:text-background",
  {
    variants: {
      value: {
        X: "text-red-500 dark:text-red-400",
        O: "text-blue-500 dark:text-blue-400",
        null: "text-foreground dark:text-background",
      },
      size: {
        sm: "h-32 w-32",
        md: "h-40 w-40",
        lg: "h-48 w-48",
      },
      winning: {
        true: "bg-green-500/25 ring-2 ring-green-500 dark:bg-green-500/20 dark:ring-green-400",
        false: "",
      },
    },
    defaultVariants: {
      value: null,
      size: "md",
      winning: false,
    },
  }
)

function GameCell({
  className,
  value,
  size = "md",
  winning = false,
  disabled,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  value?: "X" | "O" | null
  size?: "sm" | "md" | "lg"
  winning?: boolean
}) {
  return (
    <Button
      type="button"
      className={cn(cellVariants({ value, size, winning }), className)}
      {...props}
      disabled={disabled}
    >
      {value === "X" && <X className="size-24" aria-hidden />}
      {value === "O" && <Circle className="size-24" aria-hidden />}
    </Button>
  )
}

export { GameCell }
