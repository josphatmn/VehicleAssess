"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  createVehiclePart,
  updateVehiclePart,
  deleteVehiclePart,
} from "@/actions/admin";
import { PART_CATEGORIES } from "@/types";

interface VehicleVariant {
  id: string;
  name: string;
  model: { name: string; make: { name: string } };
}

interface VehiclePart {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  unitPrice: number;
  labourCost: number;
  active: boolean;
  variantId: string | null;
  variant: {
    name: string;
    model: { name: string; make: { name: string } };
  } | null;
}

interface PartFormData {
  partNumber: string;
  name: string;
  category: string;
  unitPrice: string;
  labourCost: string;
  variantId: string;
}

const emptyForm: PartFormData = {
  partNumber: "",
  name: "",
  category: "",
  unitPrice: "",
  labourCost: "",
  variantId: "",
};

export function PartsClient({
  parts,
  variants,
}: {
  parts: VehiclePart[];
  variants: VehicleVariant[];
}) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<VehiclePart | null>(null);
  const [addForm, setAddForm] = useState<PartFormData>(emptyForm);
  const [editForm, setEditForm] = useState<PartFormData>(emptyForm);
  const [loading, setLoading] = useState(false);

  function updateAddForm(field: keyof PartFormData, value: string) {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateEditForm(field: keyof PartFormData, value: string) {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }

  function isFormValid(form: PartFormData) {
    return (
      form.partNumber.trim() &&
      form.name.trim() &&
      form.category &&
      form.unitPrice &&
      form.labourCost
    );
  }

  async function handleAdd() {
    if (!isFormValid(addForm)) return;
    setLoading(true);
    try {
      await createVehiclePart({
        partNumber: addForm.partNumber.trim(),
        name: addForm.name.trim(),
        category: addForm.category,
        unitPrice: parseFloat(addForm.unitPrice),
        labourCost: parseFloat(addForm.labourCost),
        variantId: addForm.variantId || undefined,
      });
      toast.success("Part created successfully");
      setAddOpen(false);
      setAddForm(emptyForm);
      router.refresh();
    } catch {
      toast.error("Failed to create part");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editItem || !isFormValid(editForm)) return;
    setLoading(true);
    try {
      await updateVehiclePart(editItem.id, {
        partNumber: editForm.partNumber.trim(),
        name: editForm.name.trim(),
        category: editForm.category,
        unitPrice: parseFloat(editForm.unitPrice),
        labourCost: parseFloat(editForm.labourCost),
        variantId: editForm.variantId || undefined,
        active: editItem.active,
      });
      toast.success("Part updated successfully");
      setEditOpen(false);
      setEditItem(null);
      setEditForm(emptyForm);
      router.refresh();
    } catch {
      toast.error("Failed to update part");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteVehiclePart(id);
      toast.success("Part deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete part");
    }
  }

  function openEdit(item: VehiclePart) {
    setEditItem(item);
    setEditForm({
      partNumber: item.partNumber,
      name: item.name,
      category: item.category,
      unitPrice: String(item.unitPrice),
      labourCost: String(item.labourCost),
      variantId: item.variantId ?? "",
    });
    setEditOpen(true);
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Parts</h1>
          <p className="text-muted-foreground">
            Manage the parts catalog used in vehicle assessments.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-1.5 size-4" />
            Add Part
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Vehicle Part</DialogTitle>
              <DialogDescription>
                Add a new part to the catalog.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-partNumber">Part Number</Label>
                  <Input
                    id="add-partNumber"
                    placeholder="e.g. BRK-001"
                    value={addForm.partNumber}
                    onChange={(e) =>
                      updateAddForm("partNumber", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-name">Part Name</Label>
                  <Input
                    id="add-name"
                    placeholder="e.g. Front Brake Pad"
                    value={addForm.name}
                    onChange={(e) => updateAddForm("name", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={addForm.category}
                  onValueChange={(v) => updateAddForm("category", v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PART_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-unitPrice">Unit Price (ZAR)</Label>
                  <Input
                    id="add-unitPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={addForm.unitPrice}
                    onChange={(e) =>
                      updateAddForm("unitPrice", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-labourCost">Labour Cost (ZAR)</Label>
                  <Input
                    id="add-labourCost"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={addForm.labourCost}
                    onChange={(e) =>
                      updateAddForm("labourCost", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Variant (Optional)</Label>
                <Select
                  value={addForm.variantId}
                  onValueChange={(v) => updateAddForm("variantId", v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All variants (generic part)" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.model.make.name} {variant.model.name} -{" "}
                        {variant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                {loading ? "Creating..." : "Create Part"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Parts ({parts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {parts.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No vehicle parts found. Add your first part to get started.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part #</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Labour</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell className="font-mono text-xs">
                        {part.partNumber}
                      </TableCell>
                      <TableCell className="font-medium">{part.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{part.category}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {part.variant
                          ? `${part.variant.model.make.name} ${part.variant.model.name} ${part.variant.name}`
                          : "All vehicles"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(part.unitPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(part.labourCost)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={part.active ? "default" : "outline"}
                        >
                          {part.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(part)}
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
                                <AlertDialogTitle>Delete Part</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;{part.name}&quot;? This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  variant="destructive"
                                  onClick={() => handleDelete(part.id)}
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
            <DialogTitle>Edit Vehicle Part</DialogTitle>
            <DialogDescription>
              Update the part details in the catalog.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-partNumber">Part Number</Label>
                <Input
                  id="edit-partNumber"
                  placeholder="e.g. BRK-001"
                  value={editForm.partNumber}
                  onChange={(e) =>
                    updateEditForm("partNumber", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Part Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g. Front Brake Pad"
                  value={editForm.name}
                  onChange={(e) => updateEditForm("name", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(v) => updateEditForm("category", v ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {PART_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-unitPrice">Unit Price (ZAR)</Label>
                <Input
                  id="edit-unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={editForm.unitPrice}
                  onChange={(e) =>
                    updateEditForm("unitPrice", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-labourCost">Labour Cost (ZAR)</Label>
                <Input
                  id="edit-labourCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={editForm.labourCost}
                  onChange={(e) =>
                    updateEditForm("labourCost", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Variant (Optional)</Label>
              <Select
                value={editForm.variantId}
                onValueChange={(v) => updateEditForm("variantId", v ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All variants (generic part)" />
                </SelectTrigger>
                <SelectContent>
                  {variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.model.make.name} {variant.model.name} -{" "}
                      {variant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
