"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesResource = void 0;
const utils_1 = require("../utils");
/**
 * Resource class for lead note operations.
 */
class NotesResource {
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
            notes: (r.notes ?? []).map(utils_1.deserializeNote),
        };
    }
    /**
     * Create a note on a lead.
     * @param leadId - ID of the lead to attach the note to
     * @param content - Note content text
     */
    async create(leadId, content) {
        const raw = await this.http.request("POST", `/leads/${encodeURIComponent(leadId)}/notes`, { body: { content } });
        return (0, utils_1.deserializeNote)(raw);
    }
    /**
     * Update the content of an existing note.
     * @param noteId - ID of the note to update (format: "note_...")
     * @param content - New content
     */
    async update(noteId, content) {
        const raw = await this.http.request("PUT", `/notes/${encodeURIComponent(noteId)}`, { body: { content } });
        return (0, utils_1.deserializeNote)(raw);
    }
    /**
     * Delete a note permanently. Resolves when deletion succeeds (204).
     * @param noteId - ID of the note to delete (format: "note_...")
     */
    async delete(noteId) {
        await this.http.request("DELETE", `/notes/${encodeURIComponent(noteId)}`);
    }
}
exports.NotesResource = NotesResource;
//# sourceMappingURL=notes.js.map