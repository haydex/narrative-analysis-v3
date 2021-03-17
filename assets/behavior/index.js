/*



	" Reimplement the wheel to either learn, or make it better. "

    https://www.hayder.io/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: Btracker
	Description: Tracking Blog's data.
	Beneficiary: COSMOS
	
	Copyright © 1988 - 2021 HAYDEX, All Rights Reserved.
	
	
	
*/



document.addEventListener("DOMContentLoaded", function() {

    // Narrative Tree

    class NarrativeTree {

        constructor() {

            /* Entities Column */
            this.entitiesNoOfItems = document.querySelector("div#narrative-tree div#entities-column div.head div.counter span");
            this.entities = document.querySelectorAll("div#narrative-tree div#entities-column ul.items-list > li");
            this.choices = document.querySelectorAll("div#narrative-tree div#entities-column ul.items-list > li div#choice");
            this.controls = document.querySelector("div#narrative-tree div#entities-column div#entities-controls");
            this.entitiesConfirmButton = document.querySelector("div#narrative-tree div#entities-column div#entities-controls button#confirm-button");
            this.entitiesGroupButton = document.querySelector("div#narrative-tree div#entities-column div#entities-controls button#group-button");
            this.noOfChosenItemsElement = document.querySelector("div#narrative-tree div#entities-column div#entities-controls button#group-button div#group-count");
            this.numberOfSelectedEntities = 0;

            /* Narratives Column */
            this.narrativesNoOfItems = document.querySelector("div#narrative-tree div#narratives-column div.head div.counter span");
            this.narratives = document.querySelectorAll("div#narrative-tree div#narratives-column ul.items-list > li");
            this.narrativesItemsList = document.querySelector("div#narrative-tree div#narratives-column ul.items-list");
            this.narrativesColumn = document.querySelector("div#narrative-tree div#narratives-column");
            
            /* Posts Column */
            this.postsNoOfItems = document.querySelector("div#narrative-tree div#posts-column div.head div.counter span");
            this.posts = document.querySelectorAll("div#narrative-tree div#posts-column ul.items-list > li");
            this.postsItemsList = document.querySelector("div#narrative-tree div#posts-column ul.items-list");
            this.postsColumn = document.querySelector("div#narrative-tree div#posts-column");
            this.postSelected = 
            
            /* Preview Column */
            this.preview = document.querySelector("div#narrative-tree div#preview-column .items-list.post");
            this.previewColumn = document.querySelector("div#narrative-tree div#preview-column");
            this.previewImage = document.querySelector("div#narrative-tree div#preview-column .items-list.post img.post-image");
            
            /* Other */
            this.editMode = false;
            this.selectedClass= "selected";
            this.displayedClass= "displayed";
            this.activeClass = "active";
            this.chosenClass = "chosen";

            this.initialize();

        }

        initialize() {

            this.entitiesNoOfItems.innerHTML = this.entities.length;

            this.entitiesConfirmButton.addEventListener("click", this.entitiesConfirmButtonClickListener.bind(this));

            for (var i = 0; i < this.entities.length; i++) {

                this.entities[i].addEventListener("click", this.entitiesClickListener.bind(this));

            }

            for (var i = 0; i < this.narratives.length; i++) {

                this.narratives[i].addEventListener("click", this.narrativesClickListener.bind(this));

            }

            for (var i = 0; i < this.posts.length; i++) {

                this.posts[i].addEventListener("click", this.postsClickListener.bind(this));

            }

            for (var i = 0; i < this.choices.length; i++) {

                this.choices[i].addEventListener("click", this.choicesClickListener.bind(this));

            }

        }

        entitiesConfirmButtonClickListener(event) {

            this.controls.classList.remove(this.displayedClass);

            var entitiesChosen = document.querySelectorAll("div#narrative-tree div#entities-column ul.items-list > li div#choice.chosen");

            for (var i = 0; i < entitiesChosen.length; i++) {

                entitiesChosen[i].classList.remove(this.chosenClass);

            }

        }

        entitiesClickListener(event) {

            if (!this.editMode) {

                if (event.currentTarget.classList.contains(this.selectedClass)) {
                
                    event.currentTarget.classList.remove(this.selectedClass);
                    this.narrativesColumn.classList.remove(this.activeClass);
                    this.narrativesItemsList.scrollTop = 0;
                    this.narrativesItemsList.classList.remove(this.displayedClass);
                    this.narrativesNoOfItems.innerHTML = 0;
                    var narrativeSelected = document.querySelector("div#narrative-tree div#narratives-column ul.items-list > li.selected ");
                    if (narrativeSelected) narrativeSelected.click();

                } else {

                    this.narrativesColumn.classList.add(this.activeClass);
                    this.entities.forEach(element => element.classList.remove(this.selectedClass));
                    event.currentTarget.classList.add(this.selectedClass);
                    this.narrativesItemsList.classList.add(this.displayedClass);
                    this.narrativesNoOfItems.innerHTML = this.narratives.length;
                    this.narrativesItemsList.scrollTop = 0;
                    var narrativeSelected = document.querySelector("div#narrative-tree div#narratives-column ul.items-list > li.selected ");
                    if (narrativeSelected) narrativeSelected.click();

                }

            }

        }

        narrativesClickListener(event) {

            if (event.currentTarget.classList.contains(this.selectedClass)) {

                event.currentTarget.classList.remove(this.selectedClass);
                this.postsColumn.classList.remove(this.activeClass);
                this.postsItemsList.scrollTop = 0;
                this.postsItemsList.classList.remove(this.displayedClass);
                this.postsNoOfItems.innerHTML = 0;
                var postSelected = document.querySelector("div#narrative-tree div#posts-column ul.items-list > li.selected ");
                if (postSelected) postSelected.click();

            } else {

                this.postsColumn.classList.add(this.activeClass);
                this.narratives.forEach(element => element.classList.remove(this.selectedClass));
                event.currentTarget.classList.add(this.selectedClass);
                this.postsItemsList.classList.add(this.displayedClass);
                this.postsNoOfItems.innerHTML = this.posts.length;
                this.postsItemsList.scrollTop = 0;
                var postSelected = document.querySelector("div#narrative-tree div#posts-column ul.items-list > li.selected ");
                if (postSelected) postSelected.click();

            }

        }

        postsClickListener(event) {

            if (event.currentTarget.classList.contains(this.selectedClass)) {

                event.currentTarget.classList.remove(this.selectedClass);
                this.previewColumn.classList.remove(this.activeClass);
                this.preview.scrollTop = 0;
                this.preview.classList.remove(this.displayedClass);
                this.previewImage.src = "";
                

            } else {

                this.previewColumn.classList.add(this.activeClass);
                this.posts.forEach(element => element.classList.remove(this.selectedClass));
                event.currentTarget.classList.add(this.selectedClass);
                this.previewImage.src = "assets/images/posts/" + (Math.floor(Math.random() * 42) + 1) + ".jpg";
                this.preview.classList.add(this.displayedClass);
                this.preview.scrollTop = 0;

            }

        }

        choicesClickListener(event) {

            if (!event.currentTarget.classList.contains(this.chosenClass)) {

                event.currentTarget.classList.add(this.chosenClass);
                var noOfChosenItems = document.querySelectorAll("div#narrative-tree div#entities-column ul.items-list > li div#choice.chosen");
                this.noOfChosenItemsElement.innerHTML = noOfChosenItems.length;
                this.controls.classList.add(this.displayedClass);

            } else {

                event.currentTarget.classList.remove(this.chosenClass);
                var noOfChosenItems = document.querySelectorAll("div#narrative-tree div#entities-column ul.items-list > li div#choice.chosen");
                console.log(noOfChosenItems.length);
                if (noOfChosenItems.length) {

                    this.noOfChosenItemsElement.innerHTML = noOfChosenItems.length;

                } else {

                    this.controls.classList.remove(this.displayedClass);

                }

            }
            
            event.stopPropagation();
            

        }

    }

    // Initialization

    let general = new NarrativeTree();

});