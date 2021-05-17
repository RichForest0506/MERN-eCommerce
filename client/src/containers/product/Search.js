import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import {list} from './api-product.js'
import Products from './Products'

const styles = theme => ({
  card: {
    backgroundColor: '#459cb3',
    margin:'auto'
  },
  menu: {
    padding:5,
    width: 200,
  },
  textField: {
    backgroundColor: '#459cb3',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    boxShadow: 'inset 0 0 10px #000000'
  },
  searchField: {
    width: 300,
    backgroundColor: 'white'
  },
  searchButton: {
    backgroundColor: '#459cb3',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    margin: '0px',
    padding: '12px',
    boxShadow: 'inset 0 0 10px #000000'
  }
})

class Search extends Component {
  state = {
      category: '',
      search: '',
      results: [],
      searched: false
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  search = () => {
    if(this.state.search){
      list({
        search: this.state.search || undefined, category: this.state.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({results: data, searched:true})
        }
      })
    }
  }
  enterKey = (event) => {
    if(event.keyCode === 13){
      event.preventDefault()
      this.search()
    }
  }
  render() {
    const {classes} = this.props
    return (
        <div className={classes.card}>
          <TextField
            id="select-category"
            select
            label="All"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal">
            <MenuItem value="All">
              All
            </MenuItem>
            { this.props.categories.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="search"
            label="Search products"
            type="search"
            onKeyDown={this.enterKey}
            onChange={this.handleChange('search')}
            className={classes.searchField}
            margin="normal"
          />
          <Button variant="raised" color={'primary'} className={classes.searchButton} onClick={this.search}>
            <SearchIcon/>
          </Button>
          {/* <Divider/> */}
          <Products products={this.state.results} searched={this.state.searched}/>
        </div>
    )
  }
}
Search.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
}

export default withStyles(styles)(Search)
