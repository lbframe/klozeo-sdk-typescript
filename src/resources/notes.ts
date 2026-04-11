import type { Note, NoteListResult } from "../types";
import { deserializeNote } from "../utils";
import type { HttpClient } from "../client";

/**
 * Resource class for lead note operations.
 */
export class NotesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all notes for a lead.
   */
  async list(leadId: string): Promise<NoteListResult> {
    const raw = await this.http.request(
      "GET",
      `/leads/${encodeURIComponent(leadId)}/notes`
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = raw as any;
    return {
      notes: (r.notes ?? []).map(deserializeNote),
    };
  }

  /**
   * Create a note on a lead.
   * @param leadId - ID of the lead to attach the note to
   * @param content - Note content text
   */
  async create(leadId: string, content: string): Promise<Note> {
    const raw = await this.http.request(
      "POST",
      `/leads/${encodeURIComponent(leadId)}/notes`,
      { body: { content } }
    );
    return deserializeNote(raw as Record<string, unknown>);
  }

  /**
   * Update the content of an existing note.
   * @param noteId - ID of the note to update (format: "note_...")
   * @param content - New content
   */
  async update(noteId: string, content: string): Promise<Note> {
    const raw = await this.http.request(
      "PUT",
      `/notes/${encodeURIComponent(noteId)}`,
      { body: { content } }
    );
    return deserializeNote(raw as Record<string, unknown>);
  }

  /**
   * Delete a note permanently. Resolves when deletion succeeds (204).
   * @param noteId - ID of the note to delete (format: "note_...")
   */
  async delete(noteId: string): Promise<void> {
    await this.http.request("DELETE", `/notes/${encodeURIComponent(noteId)}`);
  }
}
