import React from 'react';
import {ImageUrl} from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export default class CastComponent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    render() {
        const cast = this.props.cast;

        return (
            <div style={this.styles.wrapper}>
                {cast.cast.map((credit) => {
                    const image = `${ImageUrl}w45${credit.profile_path}`;
                    return (
                        <Chip key={credit.id} style={this.styles.chip}>
                            {credit.profile_path ? <Avatar src={image}/> : null}
                            {credit.name}
                        </Chip>
                    )
                })}
            </div>
        )
    }
}