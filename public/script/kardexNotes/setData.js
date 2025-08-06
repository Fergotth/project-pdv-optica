import { 
    getNoteData,
    renderNoteHeader,
    renderArticles,
    renderPayments,
    renderTickets,
    renderTotals
} from "./utils.js";

export const setData = async (noteID) => {
    const { note, articles, payments, client, tickets } = await getNoteData(noteID);
    
    renderNoteHeader({ note, client });
    renderArticles(articles);
    renderTickets('sale', tickets);
    
    const totalPaid = renderPayments(payments);
    renderTotals(note.Total, totalPaid);
};