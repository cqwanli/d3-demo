import Hello from '../components/pages/Hello';
import * as actions from '../actions';
import { IStoreState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'

export function mapStateToProps({ enthusiasmLevel, languageName }: IStoreState) {
    return {
        enthusiasmLevel,
        name: languageName,
    }
}
export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hello);