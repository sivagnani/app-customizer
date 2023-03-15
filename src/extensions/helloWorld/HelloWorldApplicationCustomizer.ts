import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import styles from './helloword.module.scss';
import * as strings from 'HelloWorldApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {
    private topPlaceholder: PlaceholderContent | undefined;
    private bottomPlaceholder: PlaceholderContent | undefined;
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this,this.renderPlaceholders);

    return Promise.resolve();
  }
  private renderPlaceholders():void{
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
     if(!this.topPlaceholder)
     {
       this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top,{onDispose:this.onPlaceholderDispose})
     }
     if(this.topPlaceholder)
     {
        if(this.topPlaceholder.domElement)
        {
          this.topPlaceholder.domElement.innerHTML=`
          <div class="${styles.format}" >
           Technovert
           </div>
          `
        }
     }
     else{
       console.log("Could not get top placeholder");
       return;
       
     }
     if(!this.bottomPlaceholder)
     {
       this.bottomPlaceholder=this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom,{onDispose:this.onPlaceholderDispose});
     }
     if(this.bottomPlaceholder)
     {
      if(this.bottomPlaceholder.domElement)
      {
        this.bottomPlaceholder.domElement.innerHTML=`
        
        <div class="${styles.format}">
        Solutions
        </div>
        `
      }
     }
     else{
       console.log("could not load bottom placeholder");
       return;
     }
  }
  private onPlaceholderDispose(){
    console.log("Placeholder disposed");
  }
}
