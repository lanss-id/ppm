import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Recording } from '@/lib/types';

// GET all recordings
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get('active');

    let query = supabase
        .from('recordings')
        .select('*')
        .order('created_at', { ascending: false });

    if (activeOnly === 'true') {
        query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Recording[]);
}

// POST new recording
export async function POST(request: NextRequest) {
    const body = await request.json();

    const { data: existingActive } = await supabase
        .from('recordings')
        .select('id')
        .eq('is_active', true);

    // Archive all existing active recordings
    if (existingActive && existingActive.length > 0) {
        await supabase
            .from('recordings')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .eq('is_active', true);
    }

    // Insert new recording as active
    const { data, error } = await supabase
        .from('recordings')
        .insert([
            {
                ...body,
                is_active: true,
                play_count: 0,
            },
        ])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Recording, { status: 201 });
}
