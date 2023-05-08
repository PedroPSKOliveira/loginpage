import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Editor extends React.Component{

    handleChange = (e) => {
        const target = e.target;
        const { text, value } = target;

        this.setState({
            [text]: value
        })
    }
    render() {

            return (
                <div className={"editor-app"}>
                    <div className={"editor-container"}>
                        <div className={"editor-wrapper"}>
                            <form className={"editor-form-group"}>

                                <div className={"editor-form-group"}>
                                    <label>Editor</label>
                                    <textarea value={this.state.text} onChange={this.handleChange} cols={25} rows={14} className={"editor-textarea"}></textarea>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )

    }
}

