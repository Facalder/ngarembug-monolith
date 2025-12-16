# How to Create Columns for DataTable

The `DataTable` component is a generic table that accepts a `columns` prop. This guide explains how to define these columns.

## Basic Structure

Columns are defined as an array of `Column<T>` objects, where `T` is your data type (e.g., `Cafe` or `{ id: string, name: string }`).

```tsx
import { Column } from "@/components/table";

const columns: Column<Cafe>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "created_at",
    label: "Date Created",
  },
];
```

## Advanced Features

### 1. Sorting
To enable sorting for a column, add `sortable: true`.
Note: The `key` must match the sortable field in your database/backend logic.

```tsx
{
  key: "price",
  label: "Price",
  sortable: true, // Enables sort button in header
}
```

### 2. Custom Rendering
Use the `render` function to display custom content (formatting dates, badges, etc.).

```tsx
{
  key: "price",
  label: "Price",
  render: (row) => <span>{formatCurrency(row.price)}</span>,
}
```

### 3. Sticky/Pinned Columns
Pin columns to the left or right using `pinned`.
- `pinned: "left"`: Sticks to the left side (e.g., ID or Name).
- `pinned: "right"`: Sticks to the right side (usually Actions).

*Note: The Actions column is automatically pinned right in the DataTable implementation, but you can pin others.*

```tsx
{
  key: "name",
  label: "Name",
  pinned: "left", // Stays visible when scrolling horizontally
}
```

### 4. Styling
Use `className` for cell styling and `headerClassName` for header styling.

```tsx
{
  key: "status",
  label: "Status",
  className: "text-center",
  headerClassName: "w-[100px]",
}
```

## Full Example

```tsx
import { Column, DataTable } from "@/components/table";
import { Badge } from "@/components/ui/badge";

type User = {
  id: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
};

const userColumns: Column<User>[] = [
  {
    key: "name",
    label: "Full Name",
    sortable: true,
    pinned: "left",
    className: "font-medium",
  },
  {
    key: "email",
    label: "Email Address",
  },
  {
    key: "role",
    label: "Role",
    render: (user) => (
      <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
        {user.role}
      </Badge>
    ),
  },
];

// Usage
<DataTable apiEndpoint="/api/users" columns={userColumns} />
```
