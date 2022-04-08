import Modal from '../modal/modal'
import './loading.scss'

function Loading() {

    return (
        <>
        {
         <Modal>
             <div className='Loading_SubContainer'>
                <div className="lds-dual-ring"></div>
                <p>LOADING</p>
             </div>
        </Modal>   
        }
        </>
    )
}

export {Loading}