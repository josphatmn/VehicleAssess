"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  toggleSupplierActive,
} from "@/actions/admin";

interface SupplierData {
  id: string;
  name: string;
  website: string | null;
  location: string | null;
  contactPerson: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  _count: { prices: number };
}

interface SupplierFormData {
  name: string;
  website: string;
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  description: string;
}

const emptyForm: SupplierFormData = {
  name: "",
  website: "",
  location: "",
  contactPerson: "",
  phone: "",
  email: "",
  description: "",
};

export function SuppliersClient({
  suppliers,
}: {
  suppliers: SupplierData[];
}) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<SupplierData | null>(null);
  const [addForm, setAddForm] = useState<SupplierFormData>(emptyForm);
  const [editForm, setEditForm] = useState<SupplierFormData>(emptyForm);
  const [editActive, setEditActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  function updateAddForm(field: keyof SupplierFormData, value: string) {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateEditForm(field: keyof SupplierFormData, value: string) {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }

  function isFormValid(form: SupplierFormData) {
    return form.name.trim().length > 0;
  }

  async function handleAdd() {
    if (!isFormValid(addForm)) return;
    setLoading(true);
    try {
      await createSupplier({
        name: addForm.name.trim(),
        website: addForm.website.trim() || undefined,
        location: addForm.location.trim() || undefined,
        contactPerson: addForm.contactPerson.trim() || undefined,
        phone: addForm.phone.trim() || undefined,
        email: addForm.email.trim() || undefined,
        description: addForm.description.trim() || undefined,
      });
      toast.success("Supplier created successfully");
      setAddOpen(false);
      setAddForm(emptyForm);
      router.refresh();
    } catch {
      toast.error("Failed to create supplier");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editItem || !isFormValid(editForm)) return;
    setLoading(true);
    try {
      await updateSupplier(editItem.id, {
        name: editForm.name.trim(),
        website: editForm.website.trim() || undefined,
        location: editForm.location.trim() || undefined,
        contactPerson: editForm.contactPerson.trim() || undefined,
        phone: editForm.phone.trim() || undefined,
        email: editForm.email.trim() || undefined,
        description: editForm.description.trim() || undefined,
        isActive: editActive,
      });
      toast.success("Supplier updated successfully");
      setEditOpen(false);
      setEditItem(null);
      setEditForm(emptyForm);
      router.refresh();
    } catch {
      toast.error("Failed to update supplier");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete supplier");
    }
  }

  async function handleToggleActive(id: string, currentActive: boolean) {
    try {
      await toggleSupplierActive(id, !currentActive);
      toast.success(`Supplier ${currentActive ? "deactivated" : "activated"}`);
      router.refresh();
    } catch {
      toast.error("Failed to update supplier status");
    }
  }

  function openEdit(item: SupplierData) {
    setEditItem(item);
    setEditForm({
      name: item.name,
      website: item.website ?? "",
      location: item.location ?? "",
      contactPerson: item.contactPerson ?? "",
      phone: item.phone ?? "",
      email: item.email ?? "",
      description: item.description ?? "",
    });
    setEditActive(item.isActive);
    setEditOpen(true);
  }

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.location ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage auto parts suppliers used for pricing and sourcing.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-1.5 size-4" />
            Add Supplier
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Supplier</DialogTitle>
              <DialogDescription>
                Add a new auto parts supplier to the system.
              </DialogDescription>
            </DialogHeader>
            <SupplierForm form={addForm} onUpdate={updateAddForm} />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={loading || !isFormValid(addForm)}
              >
                {loading ? "Creating..." : "Create Supplier"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Suppliers ({filtered.length})</CardTitle>
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              {suppliers.length === 0
                ? "No suppliers found. Add your first supplier to get started."
                : "No suppliers match your search."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead className="text-center">Prices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          {supplier.description && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {supplier.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {supplier.location ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {supplier.contactPerson ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {supplier.phone ?? "—"}
                      </TableCell>
                      <TableCell>
                        {supplier.website ? (
                          <a
                            href={supplier.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                          >
                            {new URL(supplier.website).hostname}
                            <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">
                          {supplier._count.prices}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={supplier.isActive ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() =>
                            handleToggleActive(supplier.id, supplier.isActive)
                          }
                        >
                          {supplier.isActive ? (
                            <ToggleRight className="mr-1 size-3" />
                          ) : (
                            <ToggleLeft className="mr-1 size-3" />
                          )}
                          {supplier.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(supplier)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button variant="ghost" size="icon-sm" />
                              }
                            >
                              <Trash2 className="size-3.5 text-destructive" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;{supplier.name}&quot;?
                                  This will also remove all {supplier._count.prices} associated price records.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  variant="destructive"
                                  onClick={() => handleDelete(supplier.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>
              Update the supplier details.
            </DialogDescription>
          </DialogHeader>
          <SupplierForm form={editForm} onUpdate={updateEditForm} />
          <div className="flex items-center gap-2 py-2">
            <Label>Active</Label>
            <Badge
              variant={editActive ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setEditActive(!editActive)}
            >
              {editActive ? "Yes" : "No"}
            </Badge>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              disabled={loading || !isFormValid(editForm)}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SupplierForm({
  form,
  onUpdate,
}: {
  form: SupplierFormData;
  onUpdate: (field: keyof SupplierFormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="supplier-name">Name *</Label>
        <Input
          id="supplier-name"
          placeholder="e.g. Toyota Kenya"
          value={form.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplier-website">Website</Label>
          <Input
            id="supplier-website"
            placeholder="https://example.co.ke"
            value={form.website}
            onChange={(e) => onUpdate("website", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-location">Location</Label>
          <Input
            id="supplier-location"
            placeholder="e.g. Nairobi"
            value={form.location}
            onChange={(e) => onUpdate("location", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplier-contact">Contact Person</Label>
          <Input
            id="supplier-contact"
            placeholder="e.g. John Doe"
            value={form.contactPerson}
            onChange={(e) => onUpdate("contactPerson", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-phone">Phone</Label>
          <Input
            id="supplier-phone"
            placeholder="e.g. +254 700 000000"
            value={form.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplier-email">Email</Label>
        <Input
          id="supplier-email"
          type="email"
          placeholder="info@example.co.ke"
          value={form.email}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplier-description">Description</Label>
        <Input
          id="supplier-description"
          placeholder="Brief description of the supplier"
          value={form.description}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </div>
    </div>
  );
}
