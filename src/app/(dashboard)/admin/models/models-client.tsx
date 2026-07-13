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
  createVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
} from "@/actions/admin";

interface VehicleMake {
  id: string;
  name: string;
}

interface VehicleModel {
  id: string;
  name: string;
  makeId: string;
  make: { name: string };
  _count: { variants: number };
}

export function ModelsClient({
  models,
  makes,
}: {
  models: VehicleModel[];
  makes: VehicleMake[];
}) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<VehicleModel | null>(null);
  const [addName, setAddName] = useState("");
  const [addMakeId, setAddMakeId] = useState("");
  const [editName, setEditName] = useState("");
  const [editMakeId, setEditMakeId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!addName.trim() || !addMakeId) return;
    setLoading(true);
    try {
      await createVehicleModel({ name: addName.trim(), makeId: addMakeId });
      toast.success("Model created successfully");
      setAddOpen(false);
      setAddName("");
      setAddMakeId("");
      router.refresh();
    } catch {
      toast.error("Failed to create model");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editItem || !editName.trim() || !editMakeId) return;
    setLoading(true);
    try {
      await updateVehicleModel(editItem.id, {
        name: editName.trim(),
        makeId: editMakeId,
      });
      toast.success("Model updated successfully");
      setEditOpen(false);
      setEditItem(null);
      setEditName("");
      setEditMakeId("");
      router.refresh();
    } catch {
      toast.error("Failed to update model");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteVehicleModel(id);
      toast.success("Model deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete model");
    }
  }

  function openEdit(item: VehicleModel) {
    setEditItem(item);
    setEditName(item.name);
    setEditMakeId(item.makeId);
    setEditOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Models</h1>
          <p className="text-muted-foreground">
            Manage vehicle models under each manufacturer.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-1.5 size-4" />
            Add Model
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Vehicle Model</DialogTitle>
              <DialogDescription>
                Create a new model under a manufacturer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Make</Label>
                <Select value={addMakeId} onValueChange={(v) => setAddMakeId(v ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make.id} value={make.id}>
                        {make.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-name">Model Name</Label>
                <Input
                  id="add-name"
                  placeholder="e.g. Corolla"
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
                disabled={loading || !addName.trim() || !addMakeId}
              >
                {loading ? "Creating..." : "Create Model"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Models ({models.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {models.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No vehicle models found. Add your first model to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <Badge variant="outline">{model.make.name}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {model._count.variants} variant
                        {model._count.variants !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(model)}
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
                              <AlertDialogTitle>Delete Model</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{model.name}&quot;? This
                                will also delete all associated variants.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleDelete(model.id)}
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
            <DialogTitle>Edit Vehicle Model</DialogTitle>
            <DialogDescription>
              Update the model name and its parent make.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Make</Label>
              <Select value={editMakeId} onValueChange={(v) => setEditMakeId(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make.id} value={make.id}>
                      {make.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Model Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g. Corolla"
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
              disabled={loading || !editName.trim() || !editMakeId}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
