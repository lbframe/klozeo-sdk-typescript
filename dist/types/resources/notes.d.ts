import type { Note, NoteListResult } from "../types";
import type { HttpClient } from "../client";
/**
 * Resource class for lead note operations.
 */
export declare class NotesResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all notes for a lead.
     */
    list(leadId: string): Promise<NoteListResult>;
    /**
     * Create a note on a lead.
     * @param leadId - ID of the lead to attach the note to
     * @param content - Note content text
     */
    create(leadId: string, content: string): Promise<Note>;
    /**
     * Update the content of an existing note.
     * @param noteId - ID of the note to update (format: "note_...")
     * @param content - New content
     */
    update(noteId: string, content: string): Promise<Note>;
    /**
     * Delete a note permanently. Resolves when deletion succeeds (204).
     * @param noteId - ID of the note to delete (format: "note_...")
     */
    delete(noteId: string): Promise<void>;
}
//# sourceMappingURL=notes.d.ts.map