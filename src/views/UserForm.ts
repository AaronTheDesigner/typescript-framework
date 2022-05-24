import { User } from '../models/User'
import { View } from './View';

export class UserForm extends View {
    

    eventsMap(): { [key: string ]: () => void } {
        return {
            // 'click:button': this.onButtonClick,
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick
        }
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
                <h1>User Form</h1>
                <div>User Name: ${this.model.get('name')}</div>
                <div>User Age: ${this.model.get('age')}</div>
                <input />  
                <button class="set-name">change name</button>  
                <button class="set-age">set random age</button>         
            </div>
        `
    }

    
}