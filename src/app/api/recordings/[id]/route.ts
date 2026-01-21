import { NextRequest, NextResponse } from 'next/server';
import { supabase, deleteAudioFile } from '@/lib/supabase';
import { Recording } from '@/lib/types';

interface Params {
    params: Promise<{ id: string }>;
}

// GET single recording
export async function GET(request: NextRequest, { params }: Params) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data as Recording);
}

// PUT update recording
export async function PUT(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const body = await request.json();

    // Handle increment play count
    if (body.increment_play_count) {
        const { data: current } = await supabase
            .from('recordings')
            .select('play_count')
            .eq('id', id)
            .single();

        if (current) {
            const { data, error } = await supabase
                .from('recordings')
                .update({
                    play_count: (current.play_count || 0) + 1,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json(data as Recording);
        }
    }

    // Handle restore (make active again)
    if (body.restore) {
        // First archive current active
        await supabase
            .from('recordings')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .eq('is_active', true);

        // Then restore this one
        const { data, error } = await supabase
            .from('recordings')
            .update({
                is_active: true,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data as Recording);
    }

    // Regular update
    const { data, error } = await supabase
        .from('recordings')
        .update({
            ...body,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Recording);
}

// DELETE recording
export async function DELETE(request: NextRequest, { params }: Params) {
    const { id } = await params;

    // Get the file path first
    const { data: recording } = await supabase
        .from('recordings')
        .select('file_url')
        .eq('id', id)
        .single();

    if (recording && recording.file_url) {
        // Extract path from URL and delete from storage
        const urlParts = recording.file_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        await deleteAudioFile(fileName);
    }

    const { error } = await supabase.from('recordings').delete().eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
