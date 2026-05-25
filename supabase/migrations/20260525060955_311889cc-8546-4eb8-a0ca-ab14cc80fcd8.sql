
-- 1. Tighten profiles SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile or staff can view all"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id
  OR public.get_user_role(auth.uid()) IN ('admin'::user_role, 'librarian'::user_role)
);

-- 2. Restrict pdf_url column access to staff only
REVOKE SELECT (pdf_url) ON public.books FROM anon, authenticated;
GRANT SELECT (pdf_url) ON public.books TO service_role;
