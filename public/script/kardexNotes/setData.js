import { 
    getNoteData,
    renderNoteHeader,
    renderArticles,
    renderPayments,
    renderTotals
} from "./utils.js";

export const setData = async (noteID) => {
    const { note, articles, payments, client } = await getNoteData(noteID);
    
    renderNoteHeader({ note, client });
    renderArticles(articles);
    
    const totalPaid = renderPayments(payments);
    renderTotals(note.Total, totalPaid);
};