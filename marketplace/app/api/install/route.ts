import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

interface InstallPayload {
  slug: string;
}

export async function POST(request: NextRequest) {
  const supabase = getServiceSupabase();
  let payload: InstallPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { slug } = payload;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing required field: slug" },
      { status: 400 },
    );
  }

  // Fetch current component to get install_count
  const { data: component, error: fetchError } = await supabase
    .from("components")
    .select("id, install_count")
    .eq("slug", slug)
    .single();

  if (fetchError || !component) {
    return NextResponse.json(
      { error: `Component not found: ${slug}` },
      { status: 404 },
    );
  }

  // Increment install_count
  const newCount = (component.install_count ?? 0) + 1;
  const { error: updateError } = await supabase
    .from("components")
    .update({ install_count: newCount })
    .eq("id", component.id);

  if (updateError) {
    return NextResponse.json(
      { error: `Failed to update install count: ${updateError.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    slug,
    install_count: newCount,
  });
}
