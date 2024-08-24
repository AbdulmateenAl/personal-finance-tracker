import Modal from '../components/Modal';

function ViewExpense({show, onClose}) {
    return (
        <Modal show={show} onClose={onClose}>
            <h1>I am an Expense</h1>
        </Modal>
    )
}

export default ViewExpense;