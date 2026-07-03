const stub = {
  from: () => ({
    select: () => ({
      eq: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ error: null }),
  }),
};
export const supabase = stub as any;
