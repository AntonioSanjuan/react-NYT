import './loading.scss'

function Loading() {

    return (
        <>
        {
         <div className="Loading_MainContainer">
             <div className='Loading_SubContainer'>
                <div className="lds-dual-ring"></div>
                <p>LOADING</p>
             </div>
        </div>   
        }
        </>
    )
}

export {Loading}