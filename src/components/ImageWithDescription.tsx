import React from "react";

function ImageWithDescription(props: { image: string | undefined, description: string }) {
    if (!props.image || !props.description) {
        return null
    }

    return (
        <div className={'px-2 block'}>
            <h2 className={'subtitle is-5'}>Uploaded image:</h2>
            <div className={'is-flex is-justify-content-center'}>
                <div className={'has-text-centered'}>
                    <figure className={'image'}>
                        <img src={props.image} className={'responsive-image'}
                             alt={"Uploaded"}/>
                    </figure>
                    <p className="has-text-weight-semibold pt-2 image-description has-text-centered">{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ImageWithDescription;
