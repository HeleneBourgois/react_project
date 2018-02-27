// import React, { Component } from 'react';
// import history from './../History/history'


// class RecipeDetail extends Component {
//     handleRedirect(){
//         history.push('/recipes');
//     }
//     render(){
//         const recipes = this.props.route.data;
//         const id = this.props.params.id;
//         const recipe = recipes.filter(recipe => {
//             if(recipe.id == id) {
//                 return recipe;
//             }
//         });

//         return (
//             <div>
//                 <h1>{recipe[0].name}</h1>
//                 <div className="row">
//                     <div className="col-sm-6 col-md-4">
//                         <div className="thumbnail">
//                             <img src={recipe[0].media} alt={recipe[0].name} />
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-md-4">
//                        <ul>
//                            <li><strong>Color</strong>: {recipe[0].color}</li>
//                            <li><strong>Ingredient</strong>: {recipe[0].ingredient}</li>
//                            <li><strong>User</strong>: {recipe[0].user}</li>
//                            <li><strong>Price</strong>: {recipe[0].price}</li>
//                        </ul>
//                     </div>
//                     <div className="col-md-12">
//                         <button className="btn btn-default" onClick={this.handleRedirect.bind(this)}>Go to Recipes</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default RecipeDetail