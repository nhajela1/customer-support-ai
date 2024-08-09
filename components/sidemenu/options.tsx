import { Home, LineChart, MessageSquareWarning, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

export default function SidemenuOptions() {
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <MessageSquareWarning className="h-4 w-4" />
                Tickets
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <LineChart className="h-4 w-4" />
                Analytics
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
                <Package className="h-4 w-4" />
                Products{" "}
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Users className="h-4 w-4" />
                Customers
            </Link>
        </nav>

    )
}