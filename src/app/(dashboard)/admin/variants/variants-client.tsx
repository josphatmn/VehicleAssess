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
  createVehicleVariant,
  updateVehicleVariant,
  deleteVehicleVariant,
} from "@/actions/admin";

interface VehicleModel {
  id: string;
  name: string;
  make: { name: string };
}

interface VehicleVariant {
  id: string;
  name: string;
  modelId: string;
  model: { name: string; make: { name: string } };
  _count: { parts: number };
}

export function VariantsClient({
  variants,
  models,
}: {
  variants: VehicleVariant[];
  models: VehicleModel[];
}) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<VehicleVariant | null>(null);
  const [addName, setAddName] = useState("");
  const [addModelId, setAddModelId] = useState("");
  const [editName, setEditName] = useState("");
  const [editModelId, setEditModelId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!addName.trim() || !addModelId) return;
    setLoading(true);
    try {
      await createVehicleVariant({ name: addName.trim(), modelId: addModelId });
      toast.success("Variant created successfully");
      setAddOpen(false);
      setAddName("");
      setAddModelId("");
      router.refresh();
    } catch {
      toast.error("Failed to create variant");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editItem || !editName.trim() || !editModelId) return;
    setLoading(true);
    try {
      await updateVehicleVariant(editItem.id, {
        name: editName.trim(),
        modelId: editModelId,
      });
      toast.success("Variant updated successfully");
      setEditOpen(false);
      setEditItem(null);
      setEditName("");
      setEditModelId("");
      router.refresh();
    } catch {
      toast.error("Failed to update variant");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteVehicleVariant(id);
      toast.success("Variant deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete variant");
    }
  }

  function openEdit(item: VehicleVariant) {
    setEditItem(item);
    setEditName(item.name);
    setEditModelId(item.modelId);
    setEditOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Vehicle Variants
          </h1>
          <p className="text-muted-foreground">
            Manage vehicle variants (trim levels) under each model.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-1.5 size-4" />
            Add Variant
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Vehicle Variant</DialogTitle>
              <DialogDescription>
                Create a new variant under a model.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Model</Label>
                <Select value={addModelId} onValueChange={(v) => setAddModelId(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.make.name} - {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-name">Variant Name</Label>
                <Input
                  id="add-name"
                  placeholder="e.g. SE, Limited, XLE"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
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
                disabled={loading || !addName.trim() || !addModelId}
              >
                {loading ? "Creating..." : "Create Variant"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Variants ({variants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {variants.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No vehicle variants found. Add your first variant to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Parts</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {variant.model.make.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {variant.model.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {variant.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {variant._count.parts} part
                        {variant._count.parts !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(variant)}
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
                              <AlertDialogTitle>
                                Delete Variant
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{variant.name}&quot;? This
                                will also delete all associated parts.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleDelete(variant.id)}
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
          )}
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Variant</DialogTitle>
            <DialogDescription>
              Update the variant name and its parent model.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Model</Label>
              <Select value={editModelId} onValueChange={(v) => setEditModelId(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.make.name} - {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Variant Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g. SE, Limited, XLE"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
              />
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
              disabled={loading || !editName.trim() || !editModelId}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
