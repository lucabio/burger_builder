import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) =>{
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                error : null
            }

            this.requestInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res,error =>{
                this.setState({error:error});
            });
        }

        componentWillUnmount () {
            //console.log('will unmount',this.requestInterceptor,this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        

        errorConfirmedHandler =()=> {
            //console.log(this.state);
            this.setState({error:null})
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );            
        }
    }    
    
}

export default withErrorHandler;