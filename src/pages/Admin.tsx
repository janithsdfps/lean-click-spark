import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, LogOut, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { useCakes, type Cake } from "@/hooks/use-cakes";
import { formatPrice } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FormState = {
  id?: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  featured: boolean;
  sort_order: string;
};

const emptyForm: FormState = { name: "", price: "", description: "", image_url: "", featured: false, sort_order: "0" };

const Admin = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user, isAdmin, loading } = useAdmin();
  const { data: cakes = [], isLoading } = useCakes();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Cake | null>(null);

  useEffect(() => {
    document.title = "Manage Cakes - Miracle Cakes";
    if (!loading && !user) navigate("/admin/login");
  }, [loading, user, navigate]);

  const openNew = () => {
    setForm({ ...emptyForm, sort_order: String(cakes.length + 1) });
    setFile(null);
    setOpen(true);
  };

  const openEdit = (c: Cake) => {
    setForm({
      id: c.id, name: c.name, price: String(c.price), description: c.description ?? "",
      image_url: c.image_url ?? "", featured: c.featured, sort_order: String(c.sort_order),
    });
    setFile(null);
    setOpen(true);
  };

  const uploadImage = async (f: File) => {
    const ext = f.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("cake-images").upload(path, f, { contentType: f.type });
    if (error) throw error;
    const { data, error: urlErr } = await supabase.storage
      .from("cake-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (urlErr || !data) throw urlErr ?? new Error("Could not get photo link");
    return data.signedUrl;
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let image_url = form.image_url || null;
      if (file) image_url = await uploadImage(file);
      const payload = {
        name: form.name.trim(),
        price: parseInt(form.price, 10) || 0,
        description: form.description.trim() || null,
        image_url,
        featured: form.featured,
        sort_order: parseInt(form.sort_order, 10) || 0,
      };
      const { error } = form.id
        ? await supabase.from("cakes").update(payload).eq("id", form.id)
        : await supabase.from("cakes").insert(payload);
      if (error) throw error;
      toast.success(form.id ? "Cake updated" : "Cake added");
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["cakes"] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const { error } = await supabase.from("cakes").delete().eq("id", toDelete.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Cake deleted");
      qc.invalidateQueries({ queryKey: ["cakes"] });
    }
    setToDelete(null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  if (user && !isAdmin) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-foreground">This account doesn't have admin access.</p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16">
          <Link to="/" className="font-brand text-3xl text-foreground">miracle Cakes</Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4 mr-1" />Sign out</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Manage Cakes</h1>
            <p className="text-muted-foreground text-sm">Add, edit prices, upload photos, or remove cakes.</p>
          </div>
          <Button onClick={openNew}><Plus className="h-4 w-4 mr-1" />Add cake</Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading cakes...</p>
        ) : cakes.length === 0 ? (
          <p className="text-muted-foreground">No cakes yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4">
            {cakes.map((c) => (
              <div key={c.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                  {c.image_url && <img src={c.image_url} alt={c.name} className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-card-foreground truncate">{c.name}</h2>
                    {c.featured && <Star className="h-4 w-4 text-primary fill-primary" aria-label="Top seller" />}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{c.description}</p>
                  <p className="text-primary font-semibold">{formatPrice(c.price)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => openEdit(c)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => setToDelete(c)} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit cake" : "Add cake"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (LKR)</Label>
                <Input id="price" type="number" min={0} required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display order</Label>
                <Input id="order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              {(file || form.image_url) && (
                <img
                  src={file ? URL.createObjectURL(file) : form.image_url}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
              <Input id="photo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              <p className="text-xs text-muted-foreground">Max 5MB. JPG, PNG or WebP.</p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Show in Top Sellers</Label>
              <Switch id="featured" checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {toDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the cake from your website.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Admin;
