CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();

CREATE TABLE public.cakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  description text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cakes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cakes TO authenticated;
GRANT ALL ON public.cakes TO service_role;
ALTER TABLE public.cakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view cakes" ON public.cakes FOR SELECT USING (true);
CREATE POLICY "Admins insert cakes" ON public.cakes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cakes" ON public.cakes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cakes" ON public.cakes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER cakes_updated_at BEFORE UPDATE ON public.cakes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.cakes (name, price, description, image_url, featured, sort_order) VALUES
('Chocolate Paradise', 4500, 'Rich, decadent chocolate layers', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754894274/choclet_paradise_ylh27g.png', true, 1),
('Strawberry Dream', 4200, 'Fresh strawberries with cream', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893326/steberry_ejixum.png', true, 2),
('Velvet Cake', 4800, 'Classic red velvet elegance', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893324/velvet_cake_ijdeve.png', true, 3),
('Vegan Delight', 5000, 'Plant-based perfection', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893327/vegan_qw7sql.png', false, 4),
('Wedding Cake', 5500, 'Elegant multi-tier beauty', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893334/weding_f6ajlj.png', false, 5),
('Birthday Cake', 4000, 'Celebration classic', 'https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893325/bd_ztvaus.png', false, 6);

CREATE POLICY "Public read cake images" ON storage.objects FOR SELECT USING (bucket_id = 'cake-images');
CREATE POLICY "Admins upload cake images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cake-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cake images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cake-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cake images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cake-images' AND public.has_role(auth.uid(), 'admin'));