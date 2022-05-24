import { User, UserProps } from '../models/User'
import { View } from './View';

export class UserForm extends View<User, UserProps> {
    

    eventsMap(): { [key: string ]: () => void } {
        return {
            // 'click:button': this.onButtonClick,
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        }
    }

    onSaveClick = (): void => {
        this.model.save()
    }

    onButtonClick(): void {
        console.log('Hi there');
    }

    onSetAgeClick = (): void => {
        return this.model.setRandomAge();        
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input')

        if (input) {
            const name = input.value;

            this.model.set({ name })
        } else {
            console.log('null')
        }       
        
    }

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}" />  
                <button class="set-name">change name</button>  
                <button class="set-age">set random age</button> 
                <button class="save-model">Save User</button>        
            </div>
        `
    }

    
}