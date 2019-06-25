import React, {Component, Fragment} from 'react';
import queries from '../utils/queries';
import { graphql, compose } from 'react-apollo';
import Dropzone from 'react-dropzone';
import { Dimmer, Header, Icon, Image, Button, Input } from 'semantic-ui-react';
import '../css/cssgram.min.css'
import WrapperConsumer, { ActionTypes } from '../store';


const cssFilters = ['_1977','aden','brannan','brooklyn','clarendon','earlybird','gingham','hudson','inkwell','kelvin','lark','lofi','maven','mayfair','moon','nashville','perpetua','reyes','rise','slumber','stinson','toaster','valencia','walden','willow','xpro2'];

const styles={
  dropzoneContainer: {
    background: 'white',
    color: '#333',
    padding: '50px'
  },
  previewDiv:{
    display:'inline-block',
    padding:'10px',
    background: 'white',
    color: 'black',
    position: 'relative'
  },
  figure:{
    margin: '5px'
  },
  divFigure: {
    display: 'inline-block',
    cursor: 'pointer'
  },
  divFilters: {
    height: '200px',
    overflow: 'auto'
  },
  h4:{
    color: 'black',
    marginBottom: 0
  },
  previewFigure:{
    display: "inline-block"
  },
  showDropzoneButton:{
    position: "fixed",
    bottom: "10px",
    right: "10px"
  },
  rightButtom: {
    position: 'absolute',
    top: "10px",
    right: "10px"
  },
  leftButtom: {
    position: 'absolute',
    top: "10px",
    left: "10px"
  }
}

class UploadFile extends Component{
  defaultState = {
    file: null,
    currentFilter:"",
    active: false,
    activeView: 1,
    desc:""
  };

  state = this.defaultState;
  
    setDefaultState = () => {
      this.setState(this.defaultState)
    }
    onDrop = async ([file])=>{

        Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        this.setState({file});
        
    }

    handleFilterClick = (filter) =>{
      this.setState({currentFilter: filter});
    }

    handleShowDropzone = () => {
      this.setState({active: true});
    }

    handleClose = () =>{
      this.setState({active: false});
    }

    handleGoToView = (n) => {
      this.setState({activeView: n});
    }

    handleInputDesc = (e, {name, value}) => {
      this.setState({[name]: value})
    }

    handleSave = async ()=>{
      const {desc, currentFilter, file} = this.state;


      const { dispatch } = this.props.context;
      dispatch({type: ActionTypes.CREATE_POST, payload: {file, desc, effect: currentFilter}});
          this.setDefaultState();
    }

    render(){
      const { user } = this.props.context;
      const {file, currentFilter, active, activeView, desc} = this.state

      const ImgPreview = () => (
        <figure className={currentFilter} style={styles.previewFigure}>
                                      <Image 
                                      src={file.preview} 
                                      />
                                    </figure>
      )

        return(
          <div>
            <Dimmer active={active} page onClickOutside={this.handleClose}>
                {
                  !file && (
                <Header as="h2" icon inverted style={styles.dropzoneContainer}>
                <Dropzone onDrop={this.onDrop} multiple={false}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon name="upload" />
                        Arrastre un archivo aqui
                      </div>
                    </section>
                  )}
                </Dropzone>
                </Header>
                  )
                }
                {
                  activeView===1 && (
                    <Fragment>

                      {
                        file && (
                          <div style={styles.previewDiv}>
                          <Button circular icon="arrow right" size="huge" style={styles.rightButtom} onClick={(ev) => this.handleGoToView(2)}></Button>
                            <ImgPreview />
                            <div>
                              
                              <Image.Group size="small" style={styles.divFilters}>
                                {
                                  cssFilters.map((filter,i) => (
                                    <div key={i} style={styles.divFigure} onClick={()=>this.handleFilterClick(filter)}>
                                      <h4 style={styles.h4}>{filter}</h4>
                                    <figure className={filter} style={styles.figure}>
                                      <Image size="medium"
                                      src={file.preview} 
                                      />
                                    </figure>
      
                                    </div>
                                  ))
                                }
                              </Image.Group>
                                )
                            </div>
                          </div>
                        )
                      }
                    </Fragment>
                  )
                }
                {
                  activeView===2 && (
                    <Fragment>
                      <div style={styles.previewDiv}>
                        <Button circular icon="arrow left" size="huge" style={styles.leftButtom} onClick={(ev) => this.handleGoToView(1)}></Button>
                        @{user.username}
                        <ImgPreview />
                        <Input defaultValue={desc} name="desc" placeholder ="descripcion" onChange={this.handleInputDesc}/>
                        <Button onClick={this.handleSave}>Publicar</Button>
                      </div>
                    </Fragment>
                  )
                }
            </Dimmer>
            <Button circular icon="plus" size="huge" style={styles.showDropzoneButton} onClick={this.handleShowDropzone}></Button>
            
          </div>
        );
    }
} 

export default WrapperConsumer(UploadFile);