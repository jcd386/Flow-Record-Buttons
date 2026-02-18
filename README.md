# Flow Record Buttons

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png)](https://githubsfdeploy.herokuapp.com/app/githubdeploy/jcd386/Flow-Record-Buttons?ref=main)

A Lightning Web Component for Screen Flows that displays a record collection as clickable buttons. Supports auto-navigation, single select, and multi-select modes. Works with any Salesforce object.

## Features

- Works with any Salesforce object (Account, Contact, Opportunity, custom objects, etc.)
- **Three selection modes**: auto-navigate on click, single select, or multi-select
- **Search bar** — optional filter that grays out non-matching buttons as you type
- Configurable display field — show Name, Subject, Title, or any field as button text
- Buttons wrap into multiple rows when space is limited
- Customizable button colors and optional header/sub-header text

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
   - **Selection Mode**: Choose `auto`, `single`, or `multi`
4. Use the output variables on subsequent flow screens

### Selection Modes

| Mode | Behavior | Use When |
|------|----------|----------|
| `auto` (default) | Click a button → immediately navigates to next screen | Picking one item and moving on |
| `single` | Click to select (highlighted); click again to deselect | Choosing one item before a manual Next step |
| `multi` | Click to toggle multiple selections on/off | Selecting multiple items at once |

### Configuration Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| Records | Record Collection | Yes | — | The collection of records to display |
| Display Field API Name | String | Yes | `Name` | API name of the field for button text |
| Selection Mode | String | No | `auto` | `auto`, `single`, or `multi` |
| Show Search Bar | Boolean | No | `false` | Displays a search bar above the buttons |
| Search Placeholder | String | No | `Search...` | Placeholder text for the search bar |
| Header Text | String | No | — | Heading above the buttons |
| Sub-Header Text | String | No | — | Helper text below the heading |
| Button Color | String | No | `#0070d2` | Hex color for button background |
| Button Text Color | String | No | `#ffffff` | Hex color for button text |

### Output Variables

| Variable | Type | Modes | Description |
|----------|------|-------|-------------|
| Selected Record | Record | auto, single | The selected record |
| Selected Record ID | String | auto, single | The ID of the selected record |
| Selected Records | Record Collection | multi | All selected records |
| Selected Record IDs | String | multi | Comma-separated list of selected IDs |

## Files

| File | Description |
|------|-------------|
| `flowRecordButtons.js` | Component logic — selection modes, search filtering, flow navigation |
| `flowRecordButtons.html` | Template with search bar and flex-wrap button grid |
| `flowRecordButtons.css` | Button styling with hover, focus, and dimmed states |
| `flowRecordButtons.js-meta.xml` | Flow Screen configuration with generic SObject type |

## License

MIT
