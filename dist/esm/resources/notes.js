import { deserializeNote } from "../utils.js";
/**
 * Resource class for lead note operations.
 */
export class NotesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List all notes for a lead.
     */
    async list(leadId) {
        const raw = await this.http.request("GET", `/leads/${encodeURIComponent(leadId)}/notes`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = raw;
        return {
            notes: (r.notes ?? []).map(deserializeNote),
        };
    }
    /**
     * Create a note on a lead.
     * @param leadId - ID of the lead to attach the note to
     * @param content - Note content text
     */
    async create(leadId, content) {
        const raw = await this.http.request("POST", `/leads/${encodeURIComponent(leadId)}/notes`, { body: { content } });
        return deserializeNote(raw);
    }
    /**
     * Update the content of an existing note.
     * @param noteId - ID of the note to update (format: "note_...")
     * @param content - New content
     */
    async update(noteId, content) {
        const raw = await this.http.request("PUT", `/notes/${encodeURIComponent(noteId)}`, { body: { content } });
        return deserializeNote(raw);
    }
    /**
     * Delete a note permanently. Resolves when deletion succeeds (204).
     * @param noteId - ID of the note to delete (format: "note_...")
     */
    async delete(noteId) {
        await this.http.request("DELETE", `/notes/${encodeURIComponent(noteId)}`);
    }
}
//# sourceMappingURL=notes.js.map