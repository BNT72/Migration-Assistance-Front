import React, {Component} from "react";
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import {connect} from "react-redux";
import store from "../../store";
import {getMarker} from "../../redux/actions/map";
import Test from "../test/Test";

class MapContainer extends Component{

    constructor(props) {
        super(props);
        this.getMarkers1 = this.getMarkers1.bind(this)
        this.getMarkers2 = this.getMarkers2.bind(this)
        this.getMarkers3 = this.getMarkers3.bind(this)
        store.dispatch(getMarker("PASS_TRANSLATION"));
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    getMarkers1() {
        store.dispatch(getMarker("PASS_TRANSLATION"));
        this.val=<Test/>

    }

    getMarkers2() {
        store.dispatch(getMarker("MIA"));
        this.val=<Test/>

    }

    getMarkers3() {
        store.dispatch(getMarker("MIGRATION_CENTER"));
        this.val=<Test/>

    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render(){

        return(
            <>
                <div className="card-group p-2">
                <div className="card " onClick={this.getMarkers1}>Перевод документов</div>
                <div className="card " onClick={this.getMarkers2}>Отделения УФМС</div>
                <div className="card " onClick={this.getMarkers3}>  Центральный миграционный центр</div>
                    </div>
            <Map google={this.props.google}
                style={{width:"83.4%",height:"80%"}}
                zoom={10}
                onClick={this.onMapClicked}
                initialCenter={{
                    lat: 55.00611,
                    lng: 82.9354
                }}>
                {this.props.markers.map(marker =>
                <Marker onClick={this.onMarkerClick}
                        title={'marker'}
                        name={<><h6>{marker.name}
                        </h6><h6>{marker.address}
                        </h6> </>   }
                        position={{lat: marker.lat, lng: marker.lng}} key={marker.lat+marker.lng+marker.name}/>
                )}



                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>

            </>
    )
    }
}

function mapStateToProps(state) {
    const { markers } = state.map;
    return {
        markers
    };
}

// export default connect(mapStateToProps)(Home);


export default
connect(mapStateToProps)(
    GoogleApiWrapper({  apiKey:"AIzaSyDL5vGIOeh5sbyOCh10knbP_u7er_nfC1M", language:"ru"})(MapContainer))