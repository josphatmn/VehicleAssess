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
  createVehicleMake,
  updateVehicleMake,
  deleteVehicleMake,
} from "@/actions/admin";

interface VehicleMake {
  id: string;
  name: string;
  _count: { models: number };
}

export function MakesClient({ makes }: { makes: VehicleMake[] }) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<VehicleMake | null>(null);
  const [addName, setAddName] = useState("");
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!addName.trim()) return;
    setLoading(true);
    try {
      await createVehicleMake({ name: addName.trim() });
      toast.success("Make created successfully");
      setAddOpen(false);
      setAddName("");
      router.refresh();
    } catch {
      toast.error("Failed to create make");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!editItem || !editName.trim()) return;
    setLoading(true);
    try {
      await updateVehicleMake(editItem.id, { name: editName.trim() });
      toast.success("Make updated successfully");
      setEditOpen(false);
      setEditItem(null);
      setEditName("");
      router.refresh();
    } catch {
      toast.error("Failed to update make");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteVehicleMake(id);
      toast.success("Make deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete make");
    }
  }

  function openEdit(item: VehicleMake) {
    setEditItem(item);
    setEditName(item.name);
    setEditOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Makes</h1>
          <p className="text-muted-foreground">
            Manage vehicle manufacturers and their models.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-1.5 size-4" />
            Add Make
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Vehicle Make</DialogTitle>
              <DialogDescription>
                Enter the name of the vehicle manufacturer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="add-name">Name</Label>
                <Input
                  id="add-name"
                  placeholder="e.g. Toyota"
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
              <Button onClick={handleAdd} disabled={loading || !addName.trim()}>
                {loading ? "Creating..." : "Create Make"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Makes ({makes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {makes.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No vehicle makes found. Add your first make to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Models</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {makes.map((make) => (
                  <TableRow key={make.id}>
                    <TableCell className="font-medium">{make.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {make._count.models} model
                        {make._count.models !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(make)}
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
                              <AlertDialogTitle>Delete Make</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{make.name}&quot;? This
                                will also delete all associated models and variants.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleDelete(make.id)}
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
            <DialogTitle>Edit Vehicle Make</DialogTitle>
            <DialogDescription>
              Update the name of the vehicle manufacturer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g. Toyota"
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
            <Button onClick={handleEdit} disabled={loading || !editName.trim()}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
