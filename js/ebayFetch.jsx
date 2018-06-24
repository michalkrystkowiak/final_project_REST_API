import React from 'react';
import ReactDOM from 'react-dom';

//Komponenty
import InputWithURL from './components/InputWithURL.jsx';
import AllStats from './components/AllStats.jsx';
import ChartItemsPerDay from './components/ChartItemsPerDay.jsx';
import ChartRevenuePerDay from './components/ChartRevenuePerDay.jsx';
import TableHeader from './components/TableHeader.jsx';
import TableItems from './components/TableItems.jsx';
import TableFooter from './components/TableFooter.jsx';


//Dodatkowe moduly (Statystyka, Chart)
var sm = require('statistical-methods');
import Chart from 'chart.js';
var moment = require('moment');

//&itemFilter.name=EndTimeSoonest
//&itemFilter.value=true
//&itemFilter.name=HideDuplicateItems
//&itemFilter.value=true
//&itemFilter.name=SoldItemsOnly
//&itemFilter.value=true
//&itemFilter.name=ListingType
//&itemFilter.value=FixedPrice
//&itemFilter.name=EndTimeTo
//&itemFilter.value=2018-04-20T08:39:31.000Z

// URL Wejsciowe
function prepareUrl(params) {
    return `http://svcs.ebay.com/services/search/FindingService/v1
    ?OPERATION-NAME=findCompletedItems
    &SERVICE-VERSION=1.0.0
    &SECURITY-APPNAME=MichalKr-Test-PRD-e5d80d3bd-41bbd681
    &GLOBAL-ID=EBAY-DE
    &RESPONSE-DATA-FORMAT=JSON
    &callback=_cb_findCompletedItems
    &REST-PAYLOAD
    &keywords=Marc
    &itemFilter(0).name=Condition
    &itemFilter(0).value=3000
    &itemFilter(1).name=EndTimeFrom
    &itemFilter(1).value=2018-06-10T00:01:01.000Z
    &itemFilter(2).name=EndTimeTo
    &itemFilter(2).value=2018-06-20T23:59:01.000Z
    &itemFilter(3).name=SoldItemsOnly
    &itemFilter(3).value=true
    &itemFilter(4).name=Seller
    &itemFilter(4).value=maedchenflohmarkt
    &paginationInput.entriesPerPage=100
    &paginationInput.pageNumber=${params.pageNumber}
    &outputSelector=SellerInfo`.replace(/ /g,'');       
}

class EbayApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            itemList: [],
            queryParams: {
                pageNumber: 1,
                filterItem: "",
            },
        };
    }
   
    componentDidMount () {
        this.fetchItems()
    }

    searchItem = (e) => {
        this.setState({
            queryParams: {
                filterItem: e.target.value,
            }
        }); 
    }

    fetchItems() {
        fetch(prepareUrl(this.state.queryParams))
        .then(resp => resp.text())
        // Response w formacie text, przygotowanie pod JSON.parse
        .then(data => JSON.parse(data.slice(57).slice(0, -2))[0])
        .then(data => {
            // Dane artykulow w items, dane do paginacji w totalPages
            const items = data.searchResult[0].item;
            const totalPages = Number(data.paginationOutput[0].totalPages[0]);
            console.log(data);
            if (this.state.queryParams.pageNumber<totalPages) {
                this.setState({
                    itemList: [...this.state.itemList, ...items],
                    queryParams: {
                        ...this.state.queryParams,
                        pageNumber: this.state.queryParams.pageNumber + 1,
                    },
                }, () => this.fetchItems());
            } else {
                this.setState({
                    loading: false,
                    itemList: [...this.state.itemList, ...items],
                    //pageNumber: 1,
                });
            };
        })
        .catch(() => {
            this.setState({
                loading: false,
                title: "Error"
            });
        });
    }

    render () {
        const {loading, itemList, queryParams} = this.state;

        //Renderujemy Items, wyslane jako lista przez props
        const list = itemList.map((item, index) => {
            return (
                <tr key={item.itemId}>
                        <td>{index+1}</td>
                        <td className="textToLeft">{item.title}</td>
                        <td>{(Number(item.sellingStatus[0].currentPrice[0].__value__)).toFixed(2)}</td>
                        <td>{item.sellingStatus[0].sellingState=="EndedWithSales" ? "Sold" : "Not"}</td>
                        <td>{item.listingInfo[0].listingType=="FixedPrice" ? "Fixed" : "Bid"}</td>
                        <td>{moment(item.listingInfo[0].endTime, moment.ISO_8601).format("MM-DD-YYYY")}</td>
                        <td>{item.sellerInfo[0].sellerUserName}</td>
                </tr>
            )}
        );

        // Suma, wyslana jako sum przez props
        const sum  = itemList
                    .map(item => Number(item.sellingStatus[0].currentPrice[0].__value__))
                    .reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue;
                    }, 0);

        // Tablice potrzebna do statystyk i wykresow
        const arrayWithPrices = itemList.map(item => Number(item.sellingStatus[0].currentPrice[0].__value__));

        const arrayWithDates = itemList.map(item => moment(item.listingInfo[0].endTime, moment.ISO_8601).format("DD-MM-YYYY"));

        const itemsPerDay = itemList.reduce((accObject,item) => {
            const day = moment(item.listingInfo[0].endTime, moment.ISO_8601).format("DD-MM-YYYY");
            if (!accObject[day]) {
                accObject[day] = [item];
            } else {
                accObject[day].push(item);
            }

            return accObject;
        },{})


        const arrayWithRevenue = Object.values(itemsPerDay)
        .map(items => items.reduce(function (accumulator, item) {
            let result = accumulator + parseFloat(item.sellingStatus[0].currentPrice[0].__value__);
            return result;
            }, 0).toFixed(2)
        );



        console.log(arrayWithRevenue);


        // Statystyka dla komponentu AllStats
        const mean = sm.mean(arrayWithPrices);
        const median = sm.median(arrayWithPrices);
        const range = sm.range(arrayWithPrices);
        const stddev = (sm.stddev(arrayWithPrices)/mean)*100;

            
        return (
            <div className="mainContainer">
                <div className="firstContainer">
                    <InputWithURL filterItem={this.state.filterItem} searchItem={this.searchItem} fetchItems={this.fetchItems}/>
                </div>
                {loading  && 
                    <div>
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                        <p className="loadingParagraph">Loading...</p>
                    </div>}
                {!loading && 
                    <div>
                        <AllStats totalItems={arrayWithPrices.length} mean={mean.toFixed(2)} median={median.toFixed(2)} range={range.toFixed(2)} stddev={stddev.toFixed(2)}/>
                        <ChartItemsPerDay itemsPerDay={itemsPerDay} />
                        <ChartRevenuePerDay itemsPerDay={itemsPerDay} arrayWithRevenue={arrayWithRevenue} />
                        <table className="tableStyle">
                            <TableHeader />
                            <TableItems list={list}/>
                            <TableFooter sum={sum.toFixed(2)}/>
                        </table>
                    </div>}
            </div>
        )
    } 
 
};


const App = () => (
    <EbayApi />
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});