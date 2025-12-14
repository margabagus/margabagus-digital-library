-- Fix 1: Create trigger to prevent role self-escalation
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent users from changing their own role (only admins can change roles)
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    -- Check if the current user is an admin
    IF NOT (public.get_user_role(auth.uid()) = 'admin') THEN
      RAISE EXCEPTION 'Only administrators can change user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER check_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_escalation();

-- Fix 2: Restrict profile viewing to authenticated users only
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles" ON public.profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);