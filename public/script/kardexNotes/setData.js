import { 
    getNoteData,
    renderNoteHeader,
    renderArticles,
    renderPayments,
    renderTickets,
    renderTotals,
    sortTickets
} from "./utils.js";

export const setData = async (noteID) => {
    const { note, articles, payments, client, tickets } = await getNoteData(noteID);

    renderNoteHeader({ note, client });
    renderArticles(articles);
    renderTickets(sortTickets(tickets));
    
    const totalPaid = renderPayments(payments);
    renderTotals(note.Total, totalPaid);
};