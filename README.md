# Flow Record Buttons

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png)](https://githubsfdeploy.herokuapp.com/app/githubdeploy/jcd386/Flow-Record-Buttons?ref=main)

A Lightning Web Component for Screen Flows that displays a record collection as clickable buttons. Clicking a button selects that record and automatically navigates to the next flow screen. Works with any Salesforce object.

## Features

- Works with any Salesforce object (Account, Contact, Opportunity, custom objects, etc.)
- Configurable display field — show Name, Subject, Title, or any field as button text
- Buttons wrap into multiple rows when space is limited
- Outputs the selected record and record ID for use in subsequent flow screens
- Customizable button colors and optional header text

## Installation

### Option A: One-Click Deploy

Click the "Deploy to Salesforce" button above.

### Option B: SFDX CLI

```bash
# Clone the repo
git clone https://github.com/jcd386/Flow-Record-Buttons.git
cd Flow-Record-Buttons

# Deploy to your org
sf project deploy start --target-org YOUR_ORG_ALIAS
```

## Usage

1. In Flow Builder, add a **Screen** element
2. Drag **Flow Record Buttons** onto the screen
3. Configure:
   - **Object Type**: Select the object (e.g., Account)
   - **Records**: Assign a record collection variable
   - **Display Field API Name**: The field to show as button text (e.g., `Name`)
4. On the next screen, use the `selectedRecord` or `selectedRecordId` output variables

### Configuration Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| Records | Record Collection | Yes | — | The collection of records to display |
| Display Field API Name | String | Yes | `Name` | API name of the field for button text |
| Header Text | String | No | — | Heading above the buttons |
| Sub-Header Text | String | No | — | Helper text below the heading |
| Button Color | String | No | `#0070d2` | Hex color for button background |
| Button Text Color | String | No | `#ffffff` | Hex color for button text |

### Output Variables

| Variable | Type | Description |
|----------|------|-------------|
| Selected Record | Record | The full record that was clicked |
| Selected Record ID | String | The ID of the clicked record |

## Files

| File | Description |
|------|-------------|
| `flowRecordButtons.js` | Component logic — handles click events, outputs, and flow navigation |
| `flowRecordButtons.html` | Template with flex-wrap button grid |
| `flowRecordButtons.css` | Button styling with hover/focus states |
| `flowRecordButtons.js-meta.xml` | Flow Screen configuration with generic SObject type |

## License

MIT
