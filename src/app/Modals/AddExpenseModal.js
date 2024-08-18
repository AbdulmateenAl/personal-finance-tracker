import Modal from '../components/Modal';

function AddExpenseModal({show, onClose}){
    return (
        <Modal show={show} onClose={onClose}>
            <div>
                <div className='py-2'>
                    <p>Enter an amount, and then select a category...</p>
                </div>
                <div className='py-2'>
                    <input className='w-full' type='number' placeholder='Enter expense amount' min={0.01} step={0.01} required/>
                </div>
            </div>
        </Modal>
    )
}

export default AddExpenseModal;