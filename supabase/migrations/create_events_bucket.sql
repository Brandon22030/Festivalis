
-- Create the storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES (
  'events', 
  'events', 
  true
);

-- Apply RLS policies to the bucket
CREATE POLICY "Public Access to Event Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'events');

CREATE POLICY "Event creators can update their event images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'events' AND (auth.uid() = owner));

CREATE POLICY "Event creators can delete their event images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'events' AND (auth.uid() = owner));
