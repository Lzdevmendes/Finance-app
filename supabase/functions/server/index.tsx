import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Helper function to verify user authentication
async function verifyUser(authHeader: string | null) {
  if (!authHeader) {
    return { error: 'No authorization header', user: null };
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { error: 'Unauthorized', user: null };
  }

  return { error: null, user };
}

// Health check endpoint
app.get("/make-server-52489f87/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-52489f87/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Usuário' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user }, 201);
  } catch (error) {
    console.error('Sign up error:', error);
    return c.json({ error: 'Internal server error during sign up' }, 500);
  }
});

// Get user transactions
app.get("/make-server-52489f87/transactions", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const transactions = await kv.getByPrefix(`user:${user.id}:transaction:`);
    
    // Sort by date descending
    const sorted = transactions.sort((a, b) => 
      new Date(b.value.date).getTime() - new Date(a.value.date).getTime()
    );

    return c.json({ transactions: sorted.map(t => t.value) });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return c.json({ error: 'Failed to fetch transactions' }, 500);
  }
});

// Add transaction
app.post("/make-server-52489f87/transactions", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const { description, value, type, category, tags, date, account } = body;

    if (!description || !value || !type) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = crypto.randomUUID();
    const transaction = {
      id,
      userId: user.id,
      description,
      value: parseFloat(value),
      type,
      category: category || 'outros',
      tags: tags || [],
      account: account || 'principal',
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${user.id}:transaction:${id}`, transaction);

    return c.json({ transaction }, 201);
  } catch (error) {
    console.error('Error adding transaction:', error);
    return c.json({ error: 'Failed to add transaction' }, 500);
  }
});

// Delete transaction
app.delete("/make-server-52489f87/transactions/:id", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    await kv.del(`user:${user.id}:transaction:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return c.json({ error: 'Failed to delete transaction' }, 500);
  }
});

// Get user goals
app.get("/make-server-52489f87/goals", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const goals = await kv.getByPrefix(`user:${user.id}:goal:`);
    return c.json({ goals: goals.map(g => g.value) });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return c.json({ error: 'Failed to fetch goals' }, 500);
  }
});

// Add goal
app.post("/make-server-52489f87/goals", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const { name, targetAmount, currentAmount, icon, color } = body;

    if (!name || !targetAmount) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = crypto.randomUUID();
    const goal = {
      id,
      userId: user.id,
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount || 0),
      icon: icon || 'target',
      color: color || 'emerald',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${user.id}:goal:${id}`, goal);

    return c.json({ goal }, 201);
  } catch (error) {
    console.error('Error adding goal:', error);
    return c.json({ error: 'Failed to add goal' }, 500);
  }
});

// Update goal
app.put("/make-server-52489f87/goals/:id", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingGoal = await kv.get(`user:${user.id}:goal:${id}`);
    if (!existingGoal) {
      return c.json({ error: 'Goal not found' }, 404);
    }

    const updatedGoal = {
      ...existingGoal,
      ...body,
      id,
      userId: user.id,
    };

    await kv.set(`user:${user.id}:goal:${id}`, updatedGoal);

    return c.json({ goal: updatedGoal });
  } catch (error) {
    console.error('Error updating goal:', error);
    return c.json({ error: 'Failed to update goal' }, 500);
  }
});

// Delete goal
app.delete("/make-server-52489f87/goals/:id", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    await kv.del(`user:${user.id}:goal:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return c.json({ error: 'Failed to delete goal' }, 500);
  }
});

// Get user preferences (theme, settings)
app.get("/make-server-52489f87/preferences", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const preferences = await kv.get(`user:${user.id}:preferences`);
    return c.json({ preferences: preferences || { theme: 'emerald', darkMode: false } });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return c.json({ error: 'Failed to fetch preferences' }, 500);
  }
});

// Update preferences
app.put("/make-server-52489f87/preferences", async (c) => {
  const { error: authError, user } = await verifyUser(c.req.header('Authorization'));
  
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    await kv.set(`user:${user.id}:preferences`, body);

    return c.json({ preferences: body });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return c.json({ error: 'Failed to update preferences' }, 500);
  }
});

Deno.serve(app.fetch);
